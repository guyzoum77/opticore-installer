import path from "path";
import {databaseCredentialsUtils} from "../utils/databaseCredentials.utils";
import {askDBNameQuestion} from "../utils/askDBNameQuestion";
import {databaseSelectedUtils} from "../utils/databaseSelected.utils";
import mySqlUsecase from "../usecases/mySql.usecase";
import mongoUsecase from "../usecases/mongo.usecase";
import postgresUsecase from "../usecases/postgres.usecase";
import colors from "ansi-colors";
import createAppServerFileFunction from "./createAppServerFile.function";

export default async function databaseSelectedFunctions(file: any) {
    let databaseSelected: string = await databaseSelectedUtils();
    let dbName: string;
    const filePath: string = path.join(__dirname, "../dist/utils/template");

    if (databaseSelected === "other_db") {
        createAppServerFileFunction(filePath+"/appServerWithoutDbConfig.txt", file);
    } else  {
        const dbCredentials = await databaseCredentialsUtils();
        const dbHost: string | undefined = dbCredentials?.dbHost;
        const dbPort: string | undefined = dbCredentials?.dbPort;
        const dbUser: string | undefined = dbCredentials?.dbUser;
        const dbPwd:  string | undefined = dbCredentials?.dbPwd;

        if (dbCredentials === undefined) {
            switch (databaseSelected) {
                case "mysql":
                    createAppServerFileFunction(filePath+"/appServerWithMySQLDBConfig.txt", file);
                    break;
                case "mongodb":
                    createAppServerFileFunction(filePath+"/appServerWithMongoDBConfig.txt", file);
                    break;
                case "postgresql":
                    createAppServerFileFunction(filePath+"/appServerWithPostgresDBConfig.txt", file);
                    break;
                default:
                    createAppServerFileFunction(filePath+"/appServerWithoutDbConfig.txt", file);
                    break;
            }
        } else {
            switch (databaseSelected) {
                case "mysql":
                    dbName = await askDBNameQuestion();
                    mySqlUsecase(filePath+"/appServerWithMySQLDBConfig.txt",
                        file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials);
                    console.log(`${colors.green(
                        `Your database ${colors.bgGreen(`${colors.white(`${dbName}`)}`)} has been created successfully.`)}`
                    );
                    return databaseSelected;
                case "mongodb":
                    dbName = await askDBNameQuestion();
                    await mongoUsecase(filePath+"/appServerWithMongoDBConfig.txt",
                        file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials);
                    console.log(`${colors.green(
                        `Your database ${colors.bgGreen(`${colors.white(`${dbName}`)}`)} has been created successfully.`)}`
                    );
                    return databaseSelected;
                case "postgresql":
                    dbName = await askDBNameQuestion();
                    await postgresUsecase(filePath+"/appServerWithPostgresDBConfig.txt",
                        file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials);
                    console.log(`${colors.green(
                        `Your database ${colors.bgGreen(`${colors.white(`${dbName}`)}`)} has been created successfully.`)}`
                    );
                    return databaseSelected;
            }
        }
    }
}