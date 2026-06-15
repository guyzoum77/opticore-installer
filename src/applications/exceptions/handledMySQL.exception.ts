import fs from "fs";
import colors from "ansi-colors";
import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";


/**
 *
 * @param arg
 * @param err
 */
export const handledMySQLException = (arg: IDBParams, err: any) => {
    fs.rmSync(arg.projectPath, { recursive: true, force: true });
    switch (err.code) {
        case 'ER_NOT_SUPPORTED_AUTH_MODE':
            console.error(`${colors.red(`Client does not support authentication protocol requested by server. Please try to verify your database credentials.`)}`);
            break;
        case 'ERR_SOCKET_BAD_PORT':
            console.error(`${colors.red(`${err.message}.`)}`);
            break;
        case 'ERR_INVALID_ARG_TYPE':
            console.error(`${colors.red(`${err.message}.`)}`);
            break;
        case 'EAI_AGAIN':
            console.error(`${colors.red(`${err.message}.`)}`);
            break;
        case 'ECONNREFUSED':
            console.error(`${colors.red(`${err.message}. Try to check if the port is correct.`)}`);
            break;
        default:
            console.error();
            break;
    }
    console.error(`${colors.red(`An error occurred while creating the database : ${err.message}`)}`);
    fs.rmSync(arg.projectPath, { recursive: true, force: true });
    process.exit(0);
}