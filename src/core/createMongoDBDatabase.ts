import colors from "ansi-colors";
import dotenv from "dotenv";
import {Db, MongoClient} from "mongodb";
import clackCLI from "@clack/prompts";
import fs from "fs";

export async function createMongoDBDatabase(databaseHost: string | undefined, databaseUser: string | undefined,
                                            databasePassword: string | undefined, databaseName: string,
                                            databasePort: number, projectPath: string) {
    let ora = (await import("ora")).default;
    try {
        const configMongoUrl: string = (typeof databasePort === "number") || !isNaN(databasePort) || isFinite(databasePort)
            ? `mongodb://${databaseHost}:${databasePort}/`
            : `mongodb://${databaseHost}:${dotenv.config()!.parsed!.DATA_BASE_PORT}/`;

        const client: MongoClient = new MongoClient(
            configMongoUrl,
            {
                auth: {
                    username: databaseUser ?? dotenv.config()!.parsed!.DATA_BASE_USER,
                    password: databasePassword ?? dotenv.config()!.parsed!.DATA_BASE_PASSWORD
                }
            }
        );

        await client.connect();
        const collection = await clackCLI.text(
            {
                message: "Enter a collection of database :",
                placeholder: "dbtoto",
                validate: (value: string): string | undefined => {
                    let pattern: RegExp = new RegExp("^[a-z]+$");
                    if (!value) {
                        return "Please collection's name can't be empty.";
                    }
                    if (!pattern.test(value)) {
                        return "Please enter a valide collection's name.";
                    }
                },
            }
        );
        if (clackCLI.isCancel(collection)) {
            console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
            fs.rmSync(projectPath, { recursive: true, force: true });
            process.exit(0);
        }
        if (collection) {
            const db: Db = client.db(databaseName);
            await db.createCollection(collection);
            console.log(`${colors.green(`Your database ${colors.bgGreen(`${colors.white(`${databaseName}`)}`)} has been created successfully.`)}`);

            // Prisma installation
            let prismaOrm = await import("opticore-install-prisma");
            await prismaOrm.initializePrismaFunction();
        } else {
            console.info(`${colors.bgBlueBright("" +
                "Sorry, the database couldn't be created. In MongoDB, a database is not created until it gets content! " +
                "MongoDB waits until you have created a collection (table), with at least one document (record) before it" +
                " actually creates the database (and collection).")}`);
            fs.rmSync(projectPath, { recursive: true, force: true });
            process.exit(0);
        }

    } catch (e: any) {
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
}