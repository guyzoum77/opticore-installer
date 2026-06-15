import mySQL from "mysql2/promise";
import { PMysql } from "@opticore-installer/core/config/paramters/mysql.parameters";
import { handledMySQLException } from "@opticore-installer/applications/exceptions/handledMySQL.exception";
import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";


/**
 *
 * @param arg
 */
export async function createMySQLDatabase(arg: IDBParams): Promise<void> {
    let connection: mySQL.Connection;

    try {
        connection = await mySQL.createConnection(PMysql(arg));
        await connection.connect();
        const createDatabaseQuery: string = `CREATE DATABASE IF NOT EXISTS ${arg.dbName}`;
        await connection.query(createDatabaseQuery);
        await connection.end();

    } catch (err: any) {
        handledMySQLException(arg, err);
    }
}