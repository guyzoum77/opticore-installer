import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import fs from "fs";

export async function databaseSelectedUtils(projectPath: any): Promise<string> {
    const databaseSelected =  await clackCLI.select({
        message: 'Which database would you use ?',
        initialValue: ['mysql'],
        options: [
            {label: 'MySQL', value: ['mysql']},
            {label: 'Mongo DB', value: ['mongodb']},
            {label: 'Postgres', value: ['postgresql']},
            {label: 'Other database', value: ['other_db']},
        ],
    });

    if (clackCLI.isCancel(databaseSelected)) {
        console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit(0);
    }
    return databaseSelected[0];
}