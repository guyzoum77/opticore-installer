import { TResolvable } from "@opticore-installer/core/abstractions/types/others/resolvable.type";

export interface IDBEnvParams {
    dbName: TResolvable<string>;
    dbUser: TResolvable<string> | undefined;
    dbPwd: TResolvable<string> | undefined;
    dbHost: TResolvable<string> | undefined;
    dbPort: TResolvable<number | string>;
}