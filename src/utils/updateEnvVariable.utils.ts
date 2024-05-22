import fs from "fs";
import dotenv from "dotenv";

export function updateEnvVariableUtils(dbName: string, dbUser: string, dbPwd: string, dbHost: string, dbPort: number) {
    const envFile: string = fs.readFileSync('.env', 'utf8');
    // Parse the contents into key-value pairs
    const envConfig: dotenv.DotenvParseOutput = dotenv.parse(envFile);
    // Update the value of the desired variable
    envConfig["DATA_BASE_NAME"] = dbName;
    envConfig["DATA_BASE_USER"] = dbUser;
    envConfig["DATA_BASE_PASSWORD"] = dbPwd;
    envConfig["DATA_BASE_HOST"] = dbHost; // @ts-ignore
    envConfig["DATA_BASE_PORT"] = dbPort;

    // Serialize the key-value pairs back into a string format
    const updatedEnvFile: string = Object.entries(envConfig).map(
        ([key, value]): string => `${key}=${value}`
    ).join('\n');

    fs.writeFileSync('.env', updatedEnvFile);
}