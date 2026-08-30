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
    private readonly dbUrlScheme?: string;

    constructor(arg?: IEnvVariable, argumentConnection?: string | null, dbUrlScheme?: string) {
        this.arg = arg;
        this.argumentConnection = argumentConnection;
        this.dbUrlScheme = dbUrlScheme;
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

        // 3. Derive DATABASE_URL from the same DATA_BASE_* values, if the key exists
        this.updateDatabaseUrlSection(envFileLines, this.arg!, this.dbUrlScheme);

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

    /**
     * Derives DATABASE_URL from the DATA_BASE_* values so both stay consistent.
     * Only touches the file when the DATABASE_URL key already exists there and a scheme
     * (e.g. "postgres", "mysql", "mongodb") is known for the chosen database.
     *
     * @param envFileLines
     * @param arg
     * @param dbUrlScheme
     * @protected
     */
    protected updateDatabaseUrlSection(envFileLines: string[], arg: IEnvVariable, dbUrlScheme?: string): void {
        if (!dbUrlScheme || !arg?.dbName) {
            return;
        }

        const targetKey = "DATABASE_URL";
        const index: number = envFileLines.findIndex((line: string): boolean => {
            const trimmed: string = line.trim();
            return !trimmed.startsWith("#") && trimmed.split("=")[0] === targetKey;
        });

        if (index === -1) {
            return;
        }

        const user: string = encodeURIComponent(arg.dbUser ?? "");
        const pwd: string = encodeURIComponent(arg.dbPwd ?? "");
        const databaseUrl: string = `${dbUrlScheme}://${user}:${pwd}@${arg.dbHost ?? ""}:${arg.dbPort ?? ""}/${arg.dbName}`;

        envFileLines[index] = `${targetKey}=${databaseUrl}`;
    }
}