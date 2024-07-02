import {Client} from "pg";
import colors from "ansi-colors";
import dotenv from "dotenv";
import fs from "fs";
import {prismaInstaller} from "./prismaInstaller";


export async function createPostgresDatabase(databaseHost: string | undefined, databaseUser: string | undefined,
                                             databasePassword: string | undefined, databaseName: string,
                                             databasePort: number, projectPath: string): Promise<void> {
    try {
        const client: Client = new Client({
            host: databaseHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
            user: databaseUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
            password: databasePassword ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
            port: databasePort ?? dotenv.config()?.parsed?.DATA_BASE_PORT
        });
        await client.connect();
        await client.query(`CREATE DATABASE "${databaseName}";`);
        await prismaInstaller();
        await client.end();

    } catch (err: any) {
        console.error(`${colors.red(`An error occurred while creating the database : ${err}`)}`);
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit(0);
    }
}