import { cancel } from "@clack/prompts";
import colors from "ansi-colors";
import process from "node:process";

import { SOutputPromptSelect } from "@opticore-installer/domains/services/prompts/select/outputPromptSelect.service";
import { CSelectDBMessage } from "@opticore-installer/core/abstractions/enums/constants/selectDBMessage.constant";
import { CDbNameLabel as label } from "@opticore-installer/core/abstractions/enums/constants/dbNameLabel.constant";
import { CDbNameValue as value } from "@opticore-installer/core/abstractions/enums/constants/dbNameValue.constant";
import { SFetchCredentials } from "@opticore-installer/domains/services/fetchCredentials.service";
import { SProjectCreation } from "@opticore-installer/presentations/starter/projectCreation.starter";
import { CProjectTemplatePath as tmpl } from "@opticore-installer/core/abstractions/enums/constants/projectTemplatePath.constant";
import { ISFetchCredentials } from "@opticore-installer/core/abstractions/interfaces/dbCredentials/sfetchCredentials.interface";
import { MTemplateProject } from "@opticore-installer/presentations/middlewares/templateProject/templateProject.middleware";
import { createMongoDatabase } from "@opticore-installer/presentations/middlewares/database/createMongo.database";
import { createPostgresDatabase } from "@opticore-installer/presentations/middlewares/database/createPostgres.database";
import { createMySQLDatabase } from "@opticore-installer/presentations/middlewares/database/createMySQL.database";
import { IEnvVariable } from "@opticore-installer/core/abstractions/interfaces/environment/envVariable.interface";
import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";
import { IPostgresDBParams } from "@opticore-installer/core/abstractions/types/params/postgresDBParams.type";
import { CConnectionProperties } from "@opticore-installer/core/abstractions/enums/constants/connectionProperties.constant";



/**
 *
 * @param projectPath
 * @param currentPath
 * @param projectName
 * @constructor
 */
export const MSelectDB = async(projectPath: string, currentPath: string, projectName: string): Promise<string[] | undefined> => {
    const dbSelect: string[] | ((arg: string) => never) = await SOutputPromptSelect({
        message: CSelectDBMessage.dbSelect,
        initialValue: [label.mysql],
        options: [
            { label: label.mysql, value: [value.mysql] },
            { label: label.mongodb, value: [value.mongodb] },
            { label: label.postgresql, value: [value.postgresql] },
            // { label: label.oracle, value: [value.oracle] }, // no template repo yet, disabled
            // { label: label.otherDb, value: [value.otherDb] }, // no template repo yet, disabled
        ],
    });

    if (dbSelect instanceof Function) {
        cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
        process.exit(130);
    } else {
        const params: string | ISFetchCredentials = await SFetchCredentials(projectPath, currentPath, projectName);

        if ((params as ISFetchCredentials).dbCredentials === undefined) {
            let dbChosen: string[] = [];
            (dbSelect as string[]).map(async (item: string): Promise<void> => {
                switch (item) {
                    case value.mysql:
                        await SProjectCreation(tmpl.mysql, projectPath, currentPath, projectName)
                        break;
                    case value.postgresql:
                        await SProjectCreation(tmpl.postgresql, projectPath, currentPath, projectName);
                        break;
                    case value.mongodb:
                        await SProjectCreation(tmpl.mongodb, projectPath, currentPath, projectName);
                        break;
                    case value.oracle:
                        await SProjectCreation(tmpl.oracle, projectPath, currentPath, projectName);
                        break;
                    case value.otherDb:
                        await SProjectCreation(tmpl.otherdb, projectPath, currentPath, projectName);
                        break;
                }
                dbChosen.push(item);
            });
            return dbChosen;
        } else {
            const envParams: IEnvVariable = (params as ISFetchCredentials).envParams as IEnvVariable;

            (dbSelect as string[]).map(async (item: string): Promise<void> => {
                switch (item) {
                    case value.mysql: {
                        const mysqlParams: IDBParams = { ...envParams, projectPath };
                        await MTemplateProject(
                            tmpl.mysql,
                            projectPath,
                            currentPath,
                            async (): Promise<void> => await createMySQLDatabase(mysqlParams),
                            envParams,
                            projectName,
                            CConnectionProperties,
                            "mysql"
                        );
                        break;
                    }
                    case value.postgresql: {
                        const postgresParams: IPostgresDBParams = {
                            host: envParams.dbHost,
                            user: envParams.dbUser,
                            password: envParams.dbPwd,
                            port: envParams.dbPort,
                            database: envParams.dbName,
                            projectName
                        };
                        await MTemplateProject(
                            tmpl.postgresql,
                            projectPath,
                            currentPath,
                            async (): Promise<void> => await createPostgresDatabase(postgresParams),
                            envParams,
                            projectName,
                            undefined,
                            "postgres"
                        );
                        break;
                    }
                    case value.mongodb: {
                        const mongoParams: IDBParams = { ...envParams, projectPath };
                        await MTemplateProject(
                            tmpl.mongodb,
                            projectPath,
                            currentPath,
                            async (): Promise<void> => await createMongoDatabase(mongoParams),
                            envParams,
                            projectName,
                            undefined,
                            "mongodb"
                        );
                        break;
                    }
                    case value.oracle:
                        await MTemplateProject(
                            tmpl.oracle,
                            projectPath,
                            currentPath,
                            async (): Promise<void> => {},
                            envParams,
                            projectName
                        );
                        break;
                    case value.otherDb:
                        await MTemplateProject(
                            tmpl.otherdb,
                            projectPath,
                            currentPath,
                            async (): Promise<void> => {},
                            envParams,
                            projectName
                        );
                        break;
                }
            });
        }
    }
}