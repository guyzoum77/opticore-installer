import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import gradient from "gradient-string";
import fs from "fs";

export default async function askProjectNameUtils(): Promise<string> {
    console.log(gradient(`cyan`, `pink`, `orange`)(`╭──────────────────────────────────────────────╮\n` +
                                                                  `│                                              │\n` +
                                                                  `│             Welcome to OptiCoreJs            │\n` +
                                                                  `│                                              │\n` +
                                                                  `╰──────────────────────────────────────────────╯\n`));
    console.log(`${colors.cyan(`Let's start to create a new project.\n`)}`)
    const projectName = await clackCLI.text(
        {
            message: "Enter the name of project :",
            placeholder: "opticore",
            validate: (value: string): string | undefined => {
                let pattern: RegExp = new RegExp("^[a-z_-]+$");
                if (!value) {
                    return "Please the project name can't be empty.";
                } if (!pattern.test(value)) {
                    return "Please enter a valide project name.";
                }
            },
        }
    );

    if (clackCLI.isCancel(projectName)) {
        console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
        process.exit(0);
    }

    return projectName;
}