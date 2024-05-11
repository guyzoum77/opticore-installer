#!/usr/bin/env node

import clackCLI from "@clack/prompts";
import { promisify } from "util";
import cp from "child_process";
import colors from "ansi-colors";
import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
import databaseSelectedFunctions from "./functions/databaseSelected.functions";


export async function installer() {
    let ora = (await import("ora")).default;
    const exec = promisify(cp.exec);
    const rm   = promisify(fs.rm);

    const projectName = await clackCLI.text(
        {
            message: "Enter the name's project :",
            placeholder: "opticore",
            validate: (value: string): string | undefined => {
                let pattern: RegExp = new RegExp("^[a-z_-]+$");
                if (!value) {
                    return "Please database name can't be empty.";
                } if (!pattern.test(value)) {
                    return "Please enter a valide database name.";
                }
            },
        }
    );

    if (clackCLI.isCancel(projectName)) {
        console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
        process.exit(0);
    }

    if (projectName) {
        const currentPath: string = process.cwd();
        const projectPath: string = path.join(currentPath, projectName);
        const gitRepo: string     = "git@github.com:guyzoum77/opticore-template.git";

        if (fs.existsSync(projectPath)) {
            console.log(`${colors.cyan(`${colors.white(`${projectName} already exist, please give it another name.`)}`)}`);
            process.exit(1);
        } else {
            fs.mkdirSync(projectPath);
        }

        try {
            const gitSpinner = ora("Downloading files and project creation ...").start();
            await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
            gitSpinner.succeed();

            const cleanSpinner = ora("Removing useless files").start();
            const rmGit: Promise<void> = rm(path.join(projectPath, ".git"), { recursive: true, force: true });
            const rmBin: Promise<void> = rm(path.join(currentPath, "opticore-installer"), { recursive: true, force: true });
            await Promise.all([rmGit, rmBin]);

            process.chdir(projectPath);
            await exec("npm uninstall ora cli-spinners util @clack/prompts path fs");
            cleanSpinner.succeed();

            const npmSpinner = ora("Installing dependencies...").start();
            await exec("npm install");
            npmSpinner.succeed();

            await databaseSelectedFunctions(`${projectPath}/src/infrastructure/server/app.server.ts`);
            console.log(`${colors.cyan(`${colors.white(`${projectName} has been created successfully.`)}`)}`);

        } catch (err: any) {
            fs.rmSync(projectPath, { recursive: true, force: true });
            console.error(err);
            process.exit(1);
        }

    } else {
        console.log(`${colors.bgRed(`${colors.white("Something went wrong.")}`)}`);
        process.exit(0);
    }
}

(async() => { await installer(); })();