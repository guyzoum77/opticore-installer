import dotenv from "dotenv";
import {createMongoDBDatabase} from "../core/createMongoDBDatabase";
import {updateEnvVariableUtils} from "../utils/updateEnvVariable.utils";
import {getTemplateFromGit} from "../core/getTemplateFromGit";

export default async function mongoUsecase(dbHost: string | undefined, dbPort: string | undefined, dbUser: string | undefined,
                                           dbPwd:  string | undefined, dbName: string, dbCredentials: any, projectPath: string,
                                           currentPath: any): Promise<void> {
    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-mongodb.git", projectPath, currentPath);
    await createMongoDBDatabase(
        dbHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
        dbUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
        dbPwd ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
        dbName ?? dotenv.config()?.parsed?.DATA_BASE_NAME,
        parseInt(dbPort!) ?? parseInt(dotenv.config()!.parsed!.DATA_BASE_PORT!),
        projectPath
    );
    updateEnvVariableUtils(
        dbName,
        dbCredentials! && dbCredentials!.dbUser !== undefined ? dbCredentials!.dbUser! : (dotenv.config()?.parsed?.DATA_BASE_USER!),
        dbCredentials! && dbCredentials!.dbPwd  !== undefined ? dbCredentials!.dbPwd : (dotenv.config()?.parsed?.DATA_BASE_PASSWORD!),
        dbCredentials! && dbCredentials!.dbHost !== undefined ? dbCredentials!.dbHost : (dotenv.config()?.parsed?.DATA_BASE_HOST!),
        parseInt(dbCredentials! && dbCredentials!.dbPort !== undefined ? dbCredentials!.dbPort : (dotenv.config()?.parsed?.DATA_BASE_PORT!), 10)
    );
}