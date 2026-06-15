import { TDbFields } from "@opticore-installer/core/abstractions/types/prompts/dbFields.type";

export interface IDbCredentials extends TDbFields<'dbUser' | 'dbPwd' | 'dbHost' | 'dbPort' | 'dbName'> {}