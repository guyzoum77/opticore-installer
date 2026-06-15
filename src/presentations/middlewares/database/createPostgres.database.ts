import { Client } from "pg";
import { PPostgres } from "@opticore-installer/core/config/paramters/postgres.paramaters";
import { handledPostgresException } from "@opticore-installer/applications/exceptions/handledPostgres.exception";
import { IPostgresDBParams } from "@opticore-installer/core/abstractions/types/params/postgresDBParams.type";


/**
 *
 * @param arg
 */
export async function createPostgresDatabase(arg: IPostgresDBParams): Promise<void> {
    try {
        const client: Client = new Client(PPostgres(arg) as IPostgresDBParams);
        await client.connect();
        await client.query(`CREATE DATABASE "${arg.database}";`);
        await client.end();
    } catch (err: any) {
        handledPostgresException(arg, err);
    }
}