import clackCLI from "@clack/prompts";
import colors from "ansi-colors";

export default async function askProjectNameUtils(): Promise<string> {
    const projectName = await clackCLI.text(
        {
            message: "Enter the name of project :",
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

    return projectName;
}