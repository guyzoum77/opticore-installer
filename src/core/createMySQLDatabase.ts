import mySQL from "mysql";
import colors from "ansi-colors";
import fs from "fs";

export function createMySQLDatabase(databaseHost: string | undefined, databaseUser: string | undefined,
                                    databasePassword: string | undefined, databaseName: string,
                                    databasePort: number, projectPath: any) {
    let url: string = `mysql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
    let connection: mySQL.Connection;

    try {
        connection = mySQL.createConnection(url);
    } catch (err: any) {
        console.error(`${colors.red(
            `There were problems creating a connection to the MySQL server. The error stack was : ${err.message}`)}`
        );
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit(0);
    }

    connection.connect((err: mySQL.MysqlError) => {
        console.log(`connection is ${connection.state}`);
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
            fs.rmSync(projectPath, { recursive: true, force: true });
            process.exit(0);
        }

        const createDatabaseQuery: string = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
        connection.query(createDatabaseQuery, async(err: mySQL.MysqlError | null): Promise<void> => {
            let prismaOrm = await import("opticore-prisma-orm-installer");
            if (err) {
                console.error(`${colors.red(`Error creating database : ${err.message}`)}`);
                fs.rmSync(projectPath, { recursive: true, force: true });
                process.exit(0);
            }
            console.log(`${colors.green(`Your database ${colors.bgGreen(`${colors.white(`${databaseName}`)}`)} has been created successfully.`)}`);
            await prismaOrm.initializePrismaFunction(projectPath, "mysql");
            connection.end((err: mySQL.MysqlError | undefined): void => {
                if (err) {
                    console.error(`${colors.red(`Error closing connection : ${err.message}`)}`);
                    fs.rmSync(projectPath, { recursive: true, force: true });
                    process.exit(0);
                }
            });
        });
    });
}