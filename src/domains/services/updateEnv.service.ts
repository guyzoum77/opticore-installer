import fs from "fs";
import { IEnvVariable } from "@opticore-installer/core/abstractions/interfaces/environment/envVariable.interface";


/**
 *
 * @param arg
 * @param argumentConnection
 * @constructor
 */
export class SUpdateEnv {
    private readonly arg?: IEnvVariable;
    private readonly argumentConnection?: string | null;

    constructor(arg?: IEnvVariable, argumentConnection?: string | null) {
        this.arg = arg;
        this.argumentConnection = argumentConnection;
        this.__init();
    }

    /**
     *
     * @private
     */
    private __init(): void {
        const envFileLines: string[] = fs.readFileSync("config/env/.env", "utf8").split("\n");

        // 1. Update DATABASE section
        this.updateDatabaseSection(envFileLines, this.arg!);

        // 2. Update ARG CONNEXION section
        this.updateArgConnexionSection(envFileLines, this.argumentConnection);

        fs.writeFileSync("config/env/.env", envFileLines.join("\n"));
    }

    /**
     *
     * @param envFileLines
     * @param arg
     * @protected
     */
    protected updateDatabaseSection(envFileLines: string[], arg: IEnvVariable): void {
        const keyMap: Record<string, string | number | undefined> = {
            DATA_BASE_NAME: arg.dbName,
            DATA_BASE_USER: arg.dbUser,
            DATA_BASE_PASSWORD: arg.dbPwd,
            DATA_BASE_HOST: arg.dbHost,
            DATA_BASE_PORT: arg.dbPort,
        };

        for (let i = 0; i < envFileLines.length; i++) {
            const line: string = envFileLines[i].trim();

            // Ignore empty lines or comments (section banners vary between templates)
            if (!line || line.startsWith("#")) {
                continue;
            }

            const [key] = line.split("=");
            if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
                envFileLines[i] = `${key}=${keyMap[key] ?? ""}`;
            }
        }
    }

    /**
     *
     * @param envFileLines
     * @param argumentConnection
     * @protected
     */
    protected updateArgConnexionSection(envFileLines: string[], argumentConnection?: string | null): void {
        // Case where argumentConnection is undefined (nothing is done)
        if (argumentConnection === undefined) {
            return;
        }

        const targetKey = "ARGUMENTS_DATABASE_CONNECTION";
        for (let i = 0; i < envFileLines.length; i++) {
            const line: string = envFileLines[i].trim();

            if (!line || line.startsWith("#")) {
                continue;
            }

            const [key] = line.split("=");
            if (key === targetKey) {
                envFileLines[i] = `${key}=${argumentConnection ?? ""}`;
                return;
            }
        }

        // If the key does not exist but we have a value to define, we add it
        if (argumentConnection !== null) {
            const headerIndex: number = envFileLines.findIndex((line: string): boolean => /^#+\s*ARG\s*CONNEXION\s*$/i.test(line.trim()));
            const insertPosition: number = headerIndex !== -1 ? headerIndex + 1 : envFileLines.length;
            envFileLines.splice(insertPosition, 0, `${targetKey}=${argumentConnection}`);
        }
    }
}