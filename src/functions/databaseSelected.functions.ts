import path from "path";
import {databaseCredentialsUtils} from "../utils/databaseCredentials.utils";
import {askDBNameQuestion} from "../utils/askDBNameQuestion";
import {databaseSelectedUtils} from "../utils/databaseSelected.utils";
import mySqlUsecase from "../usecases/mySql.usecase";
import mongoUsecase from "../usecases/mongo.usecase";
import postgresUsecase from "../usecases/postgres.usecase";
import createAppServerFileFunction from "./createAppServerFile.function";

export default async function databaseSelectedFunctions(file: any, projectPath: any): Promise<void> {
    let databaseSelected: string = await databaseSelectedUtils(projectPath);
    let dbName: string;
    const filePath: string = path.join(__dirname, "../dist/utils/template");

    if (databaseSelected === "other_db") {
        createAppServerFileFunction(filePath+"/appServerWithoutDbConfig.txt", file);
    } else  {
        const dbCredentials = await databaseCredentialsUtils(projectPath);
        const dbHost: string | undefined = dbCredentials?.dbHost;
        const dbPort: string | undefined = dbCredentials?.dbPort;
        const dbUser: string | undefined = dbCredentials?.dbUser;
        const dbPwd:  string | undefined = dbCredentials?.dbPwd;

        if (dbCredentials === undefined) {
            switch (databaseSelected) {
                case "mysql":
                    createAppServerFileFunction(filePath + "/appServerWithMySQLDBConfig.txt", file);
                    break;
                case "mongodb":
                    createAppServerFileFunction(filePath + "/appServerWithMongoDBConfig.txt", file);
                    break;
                case "postgresql":
                    createAppServerFileFunction(filePath + "/appServerWithPostgresDBConfig.txt", file);
                    break;
                default:
                    createAppServerFileFunction(filePath + "/appServerWithoutDbConfig.txt", file);
                    break;
            }
        } else {
            switch (databaseSelected) {
                case "mysql":
                    dbName = await askDBNameQuestion(projectPath);
                    await mySqlUsecase(
                        filePath + "/appServerWithMySQLDBConfig.txt",
                        file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials, projectPath);
                    break;
                case "mongodb":
                    dbName = await askDBNameQuestion(projectPath);
                    await mongoUsecase(
                        filePath+"/appServerWithMongoDBConfig.txt",
                        file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials, projectPath);
                    break;
                case "postgresql":
                    dbName = await askDBNameQuestion(projectPath);
                    await postgresUsecase(
                        filePath+"/appServerWithPostgresDBConfig.txt",
                        file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials, projectPath);
                    break;
            }
        }
    }
}