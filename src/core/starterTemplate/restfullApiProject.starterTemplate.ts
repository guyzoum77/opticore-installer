import path from "path";
import fs from "fs";
import colors from "ansi-colors";
import askInstallingRSAKeypairUtils from "../../utils/askInstallingRSAKeypair.utils";
import databaseSelectedFunctions from "../../functions/databaseSelected.functions";
import {consoleMessageInfo} from "../../utils/info/consoleMessage.info";

export async function restfullApiProjectStarterTemplate(projectName: any, ora: any, exec: any, rm: any,) {
    if (projectName) {
        const currentPath: string = process.cwd();
        const projectPath: string = path.join(currentPath, projectName);
        const gitRepo: string = "git@github.com:guyzoum77/opticore-template.git";

        if (fs.existsSync(projectPath)) {
            console.log(`${colors.cyan(`${colors.white(`${projectName} already exist, please give it another name.`)}`)}`);
            fs.rmSync(projectPath, {recursive: true, force: true});
            process.exit(1);
        } else {
            fs.mkdirSync(projectPath);
        }

        try {
            const gitSpinner = ora("Downloading files and project creation").start();
            await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
            gitSpinner.succeed();

            const cleanSpinner = ora("Removing useless files").start();
            const rmGit: Promise<void> = rm(path.join(projectPath, ".git"), {recursive: true, force: true});
            const rmBin: Promise<void> = rm(path.join(currentPath, "opticore-installer"), {
                recursive: true,
                force: true
            });
            await Promise.all([rmGit, rmBin]);

            process.chdir(projectPath);
            await exec("npm uninstall ora cli-spinners util @clack/prompts path fs");
            cleanSpinner.succeed();

            const npmSpinner = ora("Installing dependencies").start();
            await exec("npm install");
            npmSpinner.succeed();

            await askInstallingRSAKeypairUtils(projectPath);
            await databaseSelectedFunctions(`${projectPath}/src/infrastructure/server/app.server.ts`, projectPath);
            consoleMessageInfo(projectName);
            process.exit();
        } catch (err: any) {
            fs.rmSync(projectPath, {recursive: true, force: true});
            console.error(err);
            process.exit(1);
        }

    } else {
        console.log(`${colors.bgRed(`${colors.white("Something went wrong.")}`)}`);
        process.exit(0);
    }
}