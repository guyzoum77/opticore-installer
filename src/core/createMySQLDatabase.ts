import mySQL from "mysql2/promise";
import colors from "ansi-colors";
import dotenv from "dotenv";
import fs from "fs";
import {prismaInstaller} from "./prismaInstaller";

export async function createMySQLDatabase(databaseHost: string | undefined, databaseUser: string | undefined,
                                    databasePassword: string | undefined, databaseName: string,
                                    databasePort: number, projectPath: any): Promise<void> {
    let connection: mySQL.Connection;
    let ora = (await import("ora")).default;

    try {
        connection = await mySQL.createConnection({
            host: databaseHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
            user: databaseUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
            password: databasePassword ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
            port: databasePort ?? parseInt(dotenv.config()?.parsed?.DATA_BASE_PORT!)
        });
        await connection.connect();
        const createDatabaseQuery: string = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
        await connection.query(createDatabaseQuery);
        await prismaInstaller("mysql");
        await connection.end();

    } catch (err: any) {
        fs.rmSync(projectPath, { recursive: true, force: true });
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
        }
        console.error(`${colors.red(`An error occurred while creating the database : ${err.message}`)}`);
        process.exit(0);
    }
}