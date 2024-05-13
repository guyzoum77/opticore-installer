import dotenv from "dotenv";
import {updateEnvVariableUtils} from "../utils/updateEnvVariable.utils";
import createAppServerFileFunction from "../functions/createAppServerFile.function";
import {createMySQLDatabase} from "../core/createMySQLDatabase";

export default function mySqlUsecase(fileContent: string,
                                     file: any,
                                     dbHost: string | undefined,
                                     dbPort: string | undefined,
                                     dbUser: string | undefined,
                                     dbPwd:  string | undefined,
                                     dbName: string,
                                     dbCredentials: any) {
    createAppServerFileFunction(fileContent, file);
    createMySQLDatabase(
        dbHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
        dbUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
        dbPwd ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
        dbName ?? dotenv.config()?.parsed?.DATA_BASE_NAME,
        parseInt(dbPort!) ?? dotenv.config()?.parsed?.DATA_BASE_PORT,
    );
    updateEnvVariableUtils(
        dbName,
        dbCredentials! && dbCredentials!.dbUser !== undefined ? dbCredentials!.dbUser! : (dotenv.config()?.parsed?.DATA_BASE_USER!),
        dbCredentials! && dbCredentials!.dbPwd  !== undefined ? dbCredentials!.dbPwd : (dotenv.config()?.parsed?.DATA_BASE_PASSWORD!),
        dbCredentials! && dbCredentials!.dbHost !== undefined ? dbCredentials!.dbHost : (dotenv.config()?.parsed?.DATA_BASE_HOST!),
        parseInt(dbCredentials! && dbCredentials!.dbPort !== undefined ? dbCredentials!.dbPort : (dotenv.config()?.parsed?.DATA_BASE_PORT!), 10)
    );
}