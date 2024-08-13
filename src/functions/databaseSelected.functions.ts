import path from "path";
import {databaseCredentialsUtils} from "../utils/databaseCredentials.utils";
import {askDBNameQuestion} from "../utils/askDBNameQuestion";
import {databaseSelectedUtils} from "../utils/databaseSelected.utils";
import mySqlUsecase from "../usecases/mySql.usecase";
import mongoUsecase from "../usecases/mongo.usecase";
import postgresUsecase from "../usecases/postgres.usecase";
import {getTemplateFromGit} from "../core/getTemplateFromGit";

export async function databaseSelectedFunctions(projectName: string, projectPath: any, currentPath: any): Promise<void> {
    let databaseSelected: string = await databaseSelectedUtils(projectPath);
    let dbName: string;
    //const filePath: string = path.join(__dirname, "../dist/utils/template");

    if (databaseSelected === "other_db") {
        //createAppServerFileFunction(filePath+"/appServerWithoutDbConfig.txt", file);
    } else {
        const dbCredentials = await databaseCredentialsUtils(projectPath);
        const dbHost: string | undefined = dbCredentials?.dbHost;
        const dbPort: string | undefined = dbCredentials?.dbPort;
        const dbUser: string | undefined = dbCredentials?.dbUser;
        const dbPwd:  string | undefined = dbCredentials?.dbPwd;

        if (dbCredentials === undefined) {
            switch (databaseSelected) {
                case "mysql":
                    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-mysql.git", projectPath, currentPath);
                    break;
                case "mongodb":
                    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-mongodb.git", projectPath, currentPath);
                    break;
                case "postgresql":
                    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-postgresdb.git", projectPath, currentPath);
                    break;
                default:
                    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-postgresdb.git", projectPath, currentPath);
                    break;
            }
        }
        else {
            switch (databaseSelected) {
                case "mysql":
                    dbName = await askDBNameQuestion(projectPath);
                    await mySqlUsecase(dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials, projectPath, currentPath);
                    break;
                case "mongodb":
                    dbName = await askDBNameQuestion(projectPath);
                    await mongoUsecase(dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials, projectPath, currentPath);
                    break;
                case "postgresql":
                    dbName = await askDBNameQuestion(projectPath);
                    await postgresUsecase(dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials, projectPath, currentPath);
                    break;
            }
        }
    }
}