import path from "path";
import fs from "fs";
import {promisify} from "util";
import cp from "child_process";

export async function getTemplateFromGit(gitRepo: any, projectPath: any, currentPath: any) {
    let ora = (await import("ora")).default;
    const exec = promisify(cp.exec);
    const rm   = promisify(fs.rm);

    const gitSpinner = ora("Downloading files and project creation").start();
    try {
        await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
        gitSpinner.succeed();

        const cleanSpinner = ora("Removing useless files").start();
        await exec(`rm -rf ${path.join(projectPath, ".git")}`);

        const rmGit: Promise<void> = rm(path.join(projectPath, ".git"), {recursive: true, force: true});
        const rmBin: Promise<void> = rm(path.join(currentPath, "opticore-installer"), {recursive: true, force: true});
        await Promise.all([rmGit, rmBin]);

        const escapedPath = projectPath.replace(/^"(.*)"$/, '$1');
        process.chdir(escapedPath);
        await exec("npm uninstall ora cli-spinners util @clack/prompts path fs");
        cleanSpinner.succeed();

        const npmSpinner = ora("Installing dependencies").start();
        await exec("npm install");
        npmSpinner.succeed();
    } catch (err: any) {
        console.log("error is :", err);
        process.exit();
    }
}