import dotenv from "dotenv";
import {updateEnvVariableUtils} from "../utils/updateEnvVariable.utils";
import {createMySQLDatabase} from "../core/createMySQLDatabase";
import {getTemplateFromGit} from "../core/getTemplateFromGit";

export default async function mySqlUsecase(dbHost: string | undefined, dbPort: string | undefined,
                                     dbUser: string | undefined, dbPwd:  string | undefined, dbName: string, dbCredentials: any,
                                     projectPath: any, currentPath: any): Promise<void> {

    const host: string | undefined = dbHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST;
    const user: string | undefined = dbUser ?? dotenv.config()?.parsed?.DATA_BASE_USER;
    const password: string | undefined = dbPwd ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD;
    const port: number = parseInt(dbPort!) ?? parseInt(dotenv.config()?.parsed?.DATA_BASE_PORT!);
    const dataBaseName: string = dbName ?? dotenv.config()?.parsed?.DATA_BASE_NAME;

    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-mysql.git", projectPath, currentPath);
    await createMySQLDatabase(host, user, password, dataBaseName, port, projectPath);
    updateEnvVariableUtils(
        dbName,
        dbCredentials! && dbCredentials!.dbUser !== undefined ? dbCredentials!.dbUser! : (dotenv.config()?.parsed?.DATA_BASE_USER!),
        dbCredentials! && dbCredentials!.dbPwd  !== undefined ? dbCredentials!.dbPwd : (dotenv.config()?.parsed?.DATA_BASE_PASSWORD!),
        dbCredentials! && dbCredentials!.dbHost !== undefined ? dbCredentials!.dbHost : (dotenv.config()?.parsed?.DATA_BASE_HOST!),
        parseInt(dbCredentials! && dbCredentials!.dbPort !== undefined ? dbCredentials!.dbPort : (dotenv.config()?.parsed?.DATA_BASE_PORT!), 10)
    );
}