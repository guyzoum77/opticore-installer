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
        const sectionHeader = "#DATABASE";
        const sectionStart: number = envFileLines.findIndex((line: string): boolean => line.trim() === sectionHeader);

        if (sectionStart === -1) {
            console.warn(`Section ${sectionHeader} not found in .env file`);
            return;
        }

        for (let i = sectionStart + 1; i < envFileLines.length; i++) {
            const line: string = envFileLines[i].trim();

            // Stop if a new section is reach out
            if (line.startsWith("#") && line !== sectionHeader) {
                break;
            }

            // Ignore an empty lines or comments
            if (!line || line.startsWith("#")) {
                continue;
            }

            const [key] = line.split("=");
            switch (key) {
                case "DATA_BASE_NAME":
                    envFileLines[i] = `${key}=${arg.dbName ?? ""}`;
                    break;
                case "DATA_BASE_USER":
                    envFileLines[i] = `${key}=${arg.dbUser ?? ""}`;
                    break;
                case "DATA_BASE_PASSWORD":
                    envFileLines[i] = `${key}=${arg.dbPwd ?? ""}`;
                    break;
                case "DATA_BASE_HOST":
                    envFileLines[i] = `${key}=${arg.dbHost ?? ""}`;
                    break;
                case "DATA_BASE_PORT":
                    envFileLines[i] = `${key}=${arg.dbPort ?? ""}`;
                    break;
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
        const sectionHeader = "#ARG CONNEXION";
        const sectionStart: number = envFileLines.findIndex((line: string): boolean => line.trim() === sectionHeader);

        if (sectionStart === -1) {
            console.warn(`Section ${sectionHeader} not found in .env file`);
            return;
        }

        // Case where argumentConnection is undefined (nothing is done)
        if (argumentConnection === undefined) {
            return;
        }

        let found: boolean = false;
        for (let i = sectionStart + 1; i < envFileLines.length; i++) {
            const line: string = envFileLines[i].trim();

            // Stop if a new section is reach out
            if (line.startsWith("#") && line !== sectionHeader) {
                break;
            }

            // Ignore an empty lines or comments
            if (!line || line.startsWith("#")) {
                continue;
            }

            const [key] = line.split("=");
            if (key === "ARGUMENTS_DATABASE_CONNECTION") {
                envFileLines[i] = `${key}=${argumentConnection ?? ""}`;
                found = true;
                break;
            }
        }

        // If the line does not exist but we have a value to define, we add it
        if (!found && argumentConnection !== null) {
            const insertPosition: number = sectionStart + 1;
            envFileLines.splice(insertPosition, 0, `ARGUMENTS_DATABASE_CONNECTION=${argumentConnection}`);
        }
    }
}