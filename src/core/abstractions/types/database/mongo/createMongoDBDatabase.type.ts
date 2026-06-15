import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";

export type TCreateMongoDBDatabase = (arg: IDBParams) => Promise<void>;