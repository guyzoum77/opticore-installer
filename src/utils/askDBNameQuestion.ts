import clackCLI from "@clack/prompts";
import colors from "ansi-colors";

export async function askDBNameQuestion() {
    const dbName = await clackCLI.text(
        {
            message: "Enter the name of database :",
            placeholder: "dbtoto",
            validate: (value: string): string | undefined => {
                let pattern: RegExp = new RegExp("^[a-zA-Z0-9]+$");
                if (!value) {
                    return "Please database name can't be empty.";
                }
                if (!pattern.test(value)) {
                    return "Please enter a valide database name.";
                }
            },
        }
    );

    if (clackCLI.isCancel(dbName)) {
        console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
        process.exit(0);
    }

    return dbName;
}