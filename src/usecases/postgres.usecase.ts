import dotenv from "dotenv";
import {updateEnvVariableUtils} from "../utils/updateEnvVariable.utils";
import {createPostgresDatabase} from "../core/createPostgresDatabase";
import {getTemplateFromGit} from "../core/getTemplateFromGit";

export default async function postgresUsecase(dbHost: string | undefined,
                                              dbPort: string | undefined, dbUser: string | undefined,
                                              dbPwd:  string | undefined, dbName: string, dbCredentials: any,
                                              projectPath: any, currentPath: any): Promise<void> {
    await getTemplateFromGit("https://github.com/guyzoum77/opticore-api-restfull-template-postgresdb.git", projectPath, currentPath);
    await createPostgresDatabase(
        dbHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
        dbUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
        dbPwd ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
        dbName ?? dotenv.config()?.parsed?.DATA_BASE_NAME,
        parseInt(dbPort!) ?? dotenv.config()?.parsed?.DATA_BASE_PORT,
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