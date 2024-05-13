import clackCLI from "@clack/prompts";
import colors from "ansi-colors";

export async function databaseCredentialsUtils() {
    let dbUser;
    let dbPwd;
    let dbHost;
    let dbPort;

    const databaseCredentials =  await clackCLI.select({
        message: 'Do you want create database credentials in .env file ?',
        initialValue: ['create_db_credentials'],
        options: [
            {label: 'Create database credentials', value: ['create_db_credentials'], hint: 'recommended'},
            {label: 'No database credentials', value: ['no_db_credentials']},
        ],
    });

    if (clackCLI.isCancel(databaseCredentials)) {
        console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
        process.exit(0);
    }

    switch (databaseCredentials[0]) {
        case 'create_db_credentials':
            dbUser = await clackCLI.text({
                message: "Enter your user database :",
                placeholder: "user",
                validate: (value: string): string | undefined => {
                    let pattern: RegExp = new RegExp("(\\s)");
                    if (!value) {
                        return "Please user database can't be empty.";
                    }
                    if (pattern.test(value)) {
                        return "Please enter a valide user database.";
                    }
                },
            });
            if (clackCLI.isCancel(dbUser)) {
                console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
                process.exit(0);
            }

            dbPwd = await clackCLI.text({
                message: "Enter the password of database :",
                placeholder: "dbtoto",
                validate: (value: string): string | undefined => {
                    let pattern: RegExp = new RegExp("(\\s)");
                    if (!value) {
                        return "Please a database password can't be empty.";
                    }
                    if (pattern.test(value)) {
                        return "Please enter a valide database name.";
                    }
                },
            });
            if (clackCLI.isCancel(dbPwd)) {
                console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
                process.exit(0);
            }

            dbHost = await clackCLI.text({
                message: "Enter the host of database :",
                placeholder: "localhost",
                validate: (value: string): string | undefined => {
                    let pattern: RegExp = new RegExp("(\\s)");
                    if (!value) {
                        return "Please a database host can't be empty.";
                    }
                    if (pattern.test(value)) {
                        return "Please enter a valide database host.";
                    }
                },
            });
            if (clackCLI.isCancel(dbHost)) {
                console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
                process.exit(0);
            }

            dbPort = await clackCLI.text({
                message: "Enter the port of database :",
                placeholder: "mysql: 3306",
                validate: (value: string): string | undefined => {
                    let pattern: RegExp = new RegExp("^[0-9]+$");
                    if (!value) {
                        return "Please a database port can't be empty.";
                    }
                    if (!pattern.test(value)) {
                        return "Please enter a valide database port.";
                    }
                }
            });
            if (clackCLI.isCancel(dbPort)) {
                console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
                process.exit(0);
            }

            return { dbUser, dbPwd, dbHost, dbPort };
            break;
        case "no_db_credentials":
            console.info(`${colors.bgCyan(`${colors.white(`You will have to manually set all the variable values in the .env file.`)}`)}`);
            break;
    }
}