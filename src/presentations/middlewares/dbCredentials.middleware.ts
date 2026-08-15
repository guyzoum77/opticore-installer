import colors from "ansi-colors";
import process from "node:process";

import { cancel } from "@clack/prompts";
import { CDbNameLabel as label } from "@opticore-installer/core/abstractions/enums/constants/dbNameLabel.constant";
import { CDbNameValue as value } from "@opticore-installer/core/abstractions/enums/constants/dbNameValue.constant";
import { SOutputPromptSelect } from "@opticore-installer/domains/services/prompts/select/outputPromptSelect.service";
import { CSelectDBMessage } from "@opticore-installer/core/abstractions/enums/constants/selectDBMessage.constant";
import { SPromptsDBCredentials } from "@opticore-installer/domains/services/promptsDBCredentials.service";
import { IPromptTextServiceParams } from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";
import { IMdbCredentials } from "@opticore-installer/core/abstractions/interfaces/dbCredentials/mdbCredentials.interface";



export const MDbCredentials: (
    projectPath: string,
    currentPath?: string,
    projectName?: string
) => Promise<IMdbCredentials | string | void> = async(
    projectPath: string,
    currentPath?: string,
    projectName?: string
): Promise<IMdbCredentials | string | void> => {
    const outputDBCredentials: string[] |
        ((arg: IPromptTextServiceParams["projectPath"]) => never) = await SOutputPromptSelect({
        message: CSelectDBMessage.dbCredentials,
        initialValue: [label.createDbCredentials],
        options: [
            { label: label.createDbCredentials, value: [value.createDbCredentials] },
            { label: label.noDbCredentials, value: [value.noDbCredentials] }
        ],
    });

    let databaseUser: ((arg: IPromptTextServiceParams) => never) | string;
    let databasePassword: string | ((arg: IPromptTextServiceParams) => never);
    let databaseHost: string | ((arg: IPromptTextServiceParams) => never);
    let databasePort: string | ((arg: IPromptTextServiceParams) => never);
    let databaseName: string | ((arg: IPromptTextServiceParams) => never);

    if(outputDBCredentials instanceof Function) {
        cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
        process.exit(130);
    } else {
        let credentials: any;
        (outputDBCredentials as string[]).map(async (outputDBCredential: string): Promise<void> => {
            credentials = outputDBCredential;
        });
        if (credentials === value.noDbCredentials) {
            return value.noDbCredentials;
        } else {
            const dbCredentials = new SPromptsDBCredentials(projectPath);
            databaseUser = await dbCredentials.promptTextDatabaseUser();
            databasePassword = await dbCredentials.promptPasswordDatabasePWD();
            databasePort = await dbCredentials.promptTextDatabasePort();
            databaseHost = await dbCredentials.promptTextDatabaseHost();
            databaseName = await dbCredentials.promptTextDatabaseName();

            return {
                credentials,
                databaseUser,
                databasePassword,
                databasePort,
                databaseHost,
                databaseName
            };
        }
    }
}