import gradient from "gradient-string";
import colors from "ansi-colors";
import clackCLI from "@clack/prompts";

export async function starterKitFunction(): Promise<string> {
    console.log(gradient(`cyan`, `pink`, `orange`)(`╭──────────────────────────────────────────────╮\n` +
        `│                                              │\n` +
        `│             Welcome to OptiCoreJs            │\n` +
        `│                                              │\n` +
        `╰──────────────────────────────────────────────╯\n`));
    console.log(`${colors.cyan(`Let's start to create your new project.`)}`);
    const chooseKitStarter =  await clackCLI.select({
        message: "Which starter project would you like to use ?",
        initialValue: ["restfull_api_project"],
        options: [
            { label: "RestFull API complete project", value: ["complete_restfull_project"], hint: "Everything you'll need to build a server render web project" },
            { label: "Web project", value: ["web_project"], hint: "Everything you'll need to build a server render web project" },
            { label: "Skeleton project", value: ["skeleton_project"], hint: "A lean OptiCoreJS application with the framework core" },
            { label: "RestFull API project", value: ["restfull_api_project"], hint: "OptiCoreJS app tailored to create a RestFull APIs" },
        ],
    });
    if (clackCLI.isCancel(chooseKitStarter)) {
        console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
        process.exit(0);
    }

    return chooseKitStarter[0];
}