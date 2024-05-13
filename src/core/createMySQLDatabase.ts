import mySQL from "mysql";
import colors from "ansi-colors";
import dotenv from "dotenv";

export function createMySQLDatabase(databaseHost: string | undefined, databaseUser: string | undefined, databasePassword: string | undefined, databaseName: string, databasePort: number) {
    let connection: mySQL.Connection;
    try {
        connection = mySQL.createConnection({
            host: databaseHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
            user: databaseUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
            password: databasePassword ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
            port: databasePort ?? parseInt(dotenv.config()?.parsed?.DATA_BASE_PORT!)
        });
    } catch (err: any) {
        console.error(`${colors.red(`There were problems creating a connection to the MySQL server. The error stack was : ${err.message}`)}`);
        process.exit(0);
    }

    connection.connect((err: mySQL.MysqlError) => {
        if (err) {
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
        }

        const createDatabaseQuery: string = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
        connection.query(createDatabaseQuery, (err: mySQL.MysqlError | null, result: any) => {
            if (err) {
                console.error(`${colors.red(`Error creating database : ${err.message}`)}`);
                process.exit(0);
            }
            connection.end((err: mySQL.MysqlError | undefined) => {
                if (err) {
                    console.error(`${colors.red(`Error closing connection : ${err.message}`)}`);
                    process.exit(0);
                }
            });
        });
    });
}