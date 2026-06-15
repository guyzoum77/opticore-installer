import colors from "ansi-colors";
import fs from "fs";


/**
 *
 * @param e
 * @param databasePort
 * @param databaseHost
 * @param projectPath
 */
export const handledMongoDBException = (e: any, databasePort: number, databaseHost: string, projectPath: string) => {
    if (e.code === 18) {
        console.error(`${colors.red(`Authentication failed, be sure the credentials is correct!`)}`);
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit();
    } if (e.cause.code === 'ERR_INVALID_URL') {
        console.error(`${colors.red(`Unable to parse ${databaseHost}:${databasePort} with URL`)}`);
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit();
    } if (e.code === undefined) {
        console.error(`${colors.red(`MongoServerSelectionError: getaddrinfo EAI_AGAIN (${databaseHost} is not allow to database connection)`)}`);
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit();
    }
}