import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import fs from "fs";
import path from "path";

export default async function databaseSelectedFunctions(file: any) {
    const databaseSelected =  await clackCLI.select({
        message: 'Which database would you use ?',
        initialValue: ['mysql'],
        options: [
            {label: 'MySQL', value: ['mysql']},
            {label: 'Mongo DB', value: ['mongo_db']},
            {label: 'Postgres', value: ['postgres']},
        ],
    });

    if (clackCLI.isCancel(databaseSelected)) {
        console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
        process.exit(0);
    }

    let fileContent;
    let getFileContent;
    const filePath = path.join(__dirname, '../dist/utils/template');
    switch (databaseSelected[0]) {
        case 'mysql':
            fileContent = filePath+'/appServerWithMySQLDBConfig.txt';
            break;
        case 'mongo_db':
            fileContent = filePath+'/appServerWithMongoDBConfig.txt';
            break;
        case 'postgres':
            fileContent = filePath+'/appServerWithPostgresDBConfig.txt';
            break;
    }

    try {
        getFileContent = fs.readFileSync(`${fileContent}`, 'utf8');
    } catch (err: any) {
        console.log(`Error reading file: ${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
    }

    try {
        fs.writeFile(
            file,
            `${getFileContent}`,
            { flag: 'a+' }, (err: any) => {
                if (err) {
                    console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
                }
            }
        );
    } catch (err: any) {
        console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
    }
}