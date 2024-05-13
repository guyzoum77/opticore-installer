import {Client} from "pg";
import colors from "ansi-colors";
import dotenv from "dotenv";


export async function createPostgresDatabase(databaseHost: string | undefined, databaseUser: string | undefined, databasePassword: string | undefined, databaseName: string, databasePort: number) {
    const client: Client = new Client({
        host: databaseHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
        user: databaseUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
        password: databasePassword ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
        port: databasePort ?? dotenv.config()?.parsed?.DATA_BASE_PORT
    });

    client.connect().then(
        async() => {
            await client.query(`CREATE DATABASE "${databaseName}";`);
            console.log(`${colors.green(`Your database ${colors.bgGreen(`${colors.white(`${databaseName}`)}`)} has been created successfully.`)}`);
            await client.end();
        },
        (onRejected: any) => {
            console.error(`${colors.red(`${onRejected}`)}`);
            process.exit(0);
        }
    ).catch((onRejected: any) => {
        console.error(`${colors.red(`${onRejected}`)}`);
        process.exit(0);
    });
}