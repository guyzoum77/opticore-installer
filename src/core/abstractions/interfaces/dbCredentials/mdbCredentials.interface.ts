import { TDbFields } from "@opticore-installer/core/abstractions/types/prompts/dbFields.type";

export interface IMdbCredentials extends TDbFields<'databaseUser' | 'databasePassword' | 'databaseHost' | 'databasePort' | 'databaseName'> {
    credentials: string;
}