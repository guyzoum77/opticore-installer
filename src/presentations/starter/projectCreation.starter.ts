import { Ora } from "ora";
import path from "path";
import fs from "fs";
import cp from "child_process";
import { endingMessageInfo } from "@opticore-installer/utils/console/endingMessage.info";
import { promisify } from "util";
import { TOra } from "@opticore-installer/core/abstractions/types/others/ora.type";
import { TRemovePath } from "@opticore-installer/core/abstractions/types/others/removePath.type";
import { UpdateOpticoreDeps } from "@opticore-installer/applications/services/updateDependencies.service";



export const SProjectCreation = async (gitRepo: string, projectPath: string, currentPath: string, projectName: string) => {
    let ora: TOra = (await import("ora")).default;
    const exec = promisify(cp.exec);
    const rm: TRemovePath = promisify(fs.rm);

    const gitSpinner: Ora = ora("Downloading files and project creation").start();
    try {
        await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
        gitSpinner.succeed();

        const cleanSpinner = ora("Removing useless files").start();
        await exec(`rm -rf ${path.join(projectPath, ".git")}`);

        const rmGit: Promise<void> = rm(path.join(projectPath, ".git"), {recursive: true, force: true});
        const rmBin: Promise<void> = rm(path.join(currentPath, "opticore-installer"), {recursive: true, force: true});
        await Promise.all([rmGit, rmBin]);

        const escapedPath: string = projectPath.replace(/^"(.*)"$/, '$1');
        process.chdir(escapedPath);

        const pkgPath: string = path.join(escapedPath, "package.json");
        const pkg: any = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

        if (pkg.dependencies?.["opticore-feature-module"]) {
            pkg.dependencies["opticore-feature-component"] = pkg.dependencies["opticore-feature-module"];
            delete pkg.dependencies["opticore-feature-module"];
        }

        if (pkg.dependencies) {
            pkg.dependencies = await UpdateOpticoreDeps(exec, pkg.dependencies);
        }
        if (pkg.devDependencies) {
            pkg.devDependencies = await UpdateOpticoreDeps(exec, pkg.devDependencies);
        }

        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));
        const lockPath: string = path.join(escapedPath, "package-lock.json");
        if (fs.existsSync(lockPath)) {
            fs.unlinkSync(lockPath);
        }

        await exec("npm uninstall ora ansi-colors cli-spinner dotenv gradient-string util tsup path fs node ts-node tslib @types/cli-spinner @clack/prompts");
        cleanSpinner.succeed();

        const npmSpinner = ora("Installing dependencies").start();
        await exec("npm install");
        npmSpinner.succeed();

        const cliSpinner = ora("Installing opticore CLI globally").start();
        try {
            await exec("npm install -g opticore-cli@latest");
            cliSpinner.succeed();
        } catch {
            cliSpinner.fail("Could not install opticore-cli globally, run 'npm install -g opticore-cli@latest' manually");
        }

        fs.writeFileSync(path.join(escapedPath, ".npmrc"), "loglevel=silent\n");

        endingMessageInfo(projectName);
    } catch (err: any) {
        console.log("err is : ", err);
        process.exit();
    }
}