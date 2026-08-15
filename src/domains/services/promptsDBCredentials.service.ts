import process from "node:process";
import { cancel } from "@clack/prompts";
import colors from "ansi-colors";
import { SOutputPromptText } from "@opticore-installer/domains/services/prompts/text/outputPromptText.service";
import { CDbNameLabel as label } from "@opticore-installer/core/abstractions/enums/constants/dbNameLabel.constant";
import { SOutputPromptPassword } from "@opticore-installer/domains/services/prompts/password/outputPromptPassword.service";
import { IPromptTextServiceParams } from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";



/**
 *
 */
export class SPromptsDBCredentials {
    private readonly projectPath: string;

    constructor(projectPath: string) {
        this.projectPath = projectPath;
    }

    public async promptTextDatabaseUser(): Promise<string | ((arg: IPromptTextServiceParams) => never)> {
        const user: string | ((arg: IPromptTextServiceParams) => never) = await SOutputPromptText(
            label.messageDBUser,
            label.placeholderDBUser,
            label.dbUserInvalidValue,
            label.dbUserBadPattern,
            "^.+$",
            this.projectPath
        );

        if (user instanceof Function){
            cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
            process.exit(130);
        } else {
            return user;
        }
    }

    public async promptPasswordDatabasePWD() {
        const password = await SOutputPromptPassword(
            label.messageDBPwd
        );

        if (password instanceof Function){
            cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
            process.exit(130);
        } else {
            return password;
        }
    }

    public async promptTextDatabaseHost(): Promise<string | ((arg: IPromptTextServiceParams) => never)> {
        const host: string | ((arg: IPromptTextServiceParams) => never) = await SOutputPromptText(
            label.messageDBHost,
            label.placeholderDBHost,
            label.dbHostInvalidValue,
            label.dbHostBadPattern,
            "^[a-zA-Z]+$",
            this.projectPath
        );

        if (host instanceof Function) {
            cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
            process.exit(130);
        } else {
            return host;
        }
    }

    public async promptTextDatabasePort(): Promise<string | ((arg: IPromptTextServiceParams) => never)> {
        const port: string | ((arg: IPromptTextServiceParams) => never) = await SOutputPromptText(
            label.messageDBPort,
            label.placeholderDBPort,
            label.dbPortInvalidValue,
            label.dbPortBadPattern,
            "^[0-9]+$",
            this.projectPath
        );

        if (port instanceof Function) {
            cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
            process.exit(130);
        } else {
            return port;
        }
    }

    public async promptTextDatabaseName(): Promise<string | ((arg: IPromptTextServiceParams) => never)> {
        const dbName: string | ((arg: IPromptTextServiceParams) => never) = await SOutputPromptText(
            label.messageDBName,
            label.placeholderDBName,
            label.dbNameInvalidValue,
            label.dbNameBadPattern,
            "^.+$",
            this.projectPath
        );

        if (dbName instanceof Function) {
            cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
            process.exit(130);
        } else {
            return dbName;
        }
    }
}