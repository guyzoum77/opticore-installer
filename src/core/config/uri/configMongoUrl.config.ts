import dotenv from "dotenv";
import {
    TConfigMongoUrlConfig
} from "@opticore-installer/core/abstractions/types/database/mongo/configMongoUrlConfig.type";


export const configMongoUrlConfig: TConfigMongoUrlConfig = (databaseHost: string | undefined, databasePort: number): string => {
    return (typeof databasePort === "number") || !isNaN(databasePort) || isFinite(databasePort)
        ? `mongodb://${databaseHost}:${databasePort}/`
        : `mongodb://${databaseHost}:${dotenv.config()!.parsed!.DATA_BASE_PORT}/`;
}