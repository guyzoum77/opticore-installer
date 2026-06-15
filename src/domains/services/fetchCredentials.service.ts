import { MDbCredentials } from "@opticore-installer/presentations/middlewares/dbCredentials.middleware";
import {
    transformDbCredentialsToFusedParams
} from "@opticore-installer/domains/services/transformDbCredentialsToFusedParams.service";
import { CDbNameValue } from "@opticore-installer/core/abstractions/enums/constants/dbNameValue.constant";
import {
    ISFetchCredentialsDBParams
} from "@opticore-installer/core/abstractions/interfaces/dbCredentials/sfetchCredentialsDBParams.interface";
import { IEnvParams } from "@opticore-installer/core/abstractions/interfaces/params/envParams.interface";
import { IMdbCredentials } from "@opticore-installer/core/abstractions/interfaces/dbCredentials/mdbCredentials.interface";
import {
    ISFetchCredentials
} from "@opticore-installer/core/abstractions/interfaces/dbCredentials/sfetchCredentials.interface";



/**
 *
 * @param projectPath
 * @param currentPath
 * @param projectName
 * @constructor
 */
export const SFetchCredentials = async(projectPath: string, currentPath?: string, projectName?: string): Promise<string | ISFetchCredentials> => {
    let dbParams: ISFetchCredentialsDBParams;
    let envParams: IEnvParams;
    let fetchParams: string = "";

    const dbCredentials: IMdbCredentials | void = await MDbCredentials(projectPath, currentPath, projectName);
    const params: string | IMdbCredentials = transformDbCredentialsToFusedParams(dbCredentials!);
    if (params === CDbNameValue.noDbCredentials) {
        return params;
    } else {
        const credParams = (params as IMdbCredentials);
        dbParams = {
            databaseHost: credParams.databaseHost,
            databaseName: credParams.databaseName,
            databasePassword: credParams.databasePassword,
            databasePort: credParams.databasePort,
            databaseUser: credParams.databaseUser,
            projectPath: projectPath
        };
        envParams = {
            dbName: credParams.databaseName,
            dbUser: credParams.databaseUser,
            dbPwd: credParams.databasePassword,
            dbHost: credParams.databaseHost,
            dbPort: credParams.databasePort,
        };

        const allParams: ISFetchCredentials = { dbCredentials, fetchParams, dbParams, envParams };
        return allParams;
    }
}