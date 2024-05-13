import path from "path";
import {databaseCredentialsUtils} from "../utils/databaseCredentials.utils";
import {askDBNameQuestion} from "../utils/askDBNameQuestion";
import {databaseSelectedUtils} from "../utils/databaseSelected.utils";
import mySqlUsecase from "../usecases/mySql.usecase";
import mongoUsecase from "../usecases/mongo.usecase";
import postgresUsecase from "../usecases/postgres.usecase";
import colors from "ansi-colors";

export default async function databaseSelectedFunctions(file: any) {
    const databaseSelected: string = await databaseSelectedUtils();
    const dbCredentials = await databaseCredentialsUtils();

    let dbName: string;
    const filePath: string = path.join(__dirname, "../dist/utils/template");

    const dbHost: string | undefined = dbCredentials?.dbHost;
    const dbPort: string | undefined = dbCredentials?.dbPort;
    const dbUser: string | undefined = dbCredentials?.dbUser;
    const dbPwd:  string | undefined = dbCredentials?.dbPwd;

    switch (databaseSelected) {
        case "mysql":
            if (dbCredentials !== undefined) {
                dbName = await askDBNameQuestion();
                mySqlUsecase(filePath+"/appServerWithMySQLDBConfig.txt",
                    file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials);
                console.log(`${colors.green(
                    `Your database ${colors.bgGreen(`${colors.white(`${dbName}`)}`)} has been created successfully.`)}`
                );
            }
            break;
        case "mongo_db":
            if (dbCredentials !== undefined) {
                dbName = await askDBNameQuestion();
                await mongoUsecase(filePath+"/appServerWithMongoDBConfig.txt",
                    file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials);
                console.log(`${colors.green(
                    `Your database ${colors.bgGreen(`${colors.white(`${dbName}`)}`)} has been created successfully.`)}`
                );
            }
            break;
        case "postgres":
            if (dbCredentials !== undefined) {
                dbName = await askDBNameQuestion();
                await postgresUsecase(filePath+"/appServerWithPostgresDBConfig.txt",
                    file, dbHost, dbPort, dbUser, dbPwd, dbName, dbCredentials);
                console.log(`${colors.green(
                    `Your database ${colors.bgGreen(`${colors.white(`${dbName}`)}`)} has been created successfully.`)}`
                );
            }
            break;
    }
}