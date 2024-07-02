import clackCLI from "@clack/prompts";
import colors from "ansi-colors";

export async function promptConfirmActionFunction(): Promise<boolean> {
    const promptInput: boolean | symbol = await clackCLI.confirm({
        message: "Do you want to install RSA KeyPair ?",
        initialValue: true,
    });
    if (clackCLI.isCancel(promptInput)) {
        console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
        process.exit(0);
    }
    return promptInput;
}