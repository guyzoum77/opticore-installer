import dotenv from "dotenv";
import { IPostgresDBParams } from "@opticore-installer/core/abstractions/types/params/postgresDBParams.type";


/**
 *
 * @param arg
 * @constructor
 */
export const PPostgres = (arg: IPostgresDBParams) => {
    return {
        host: arg.host ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
        user: arg.user ?? dotenv.config()?.parsed?.DATA_BASE_USER,
        password: arg.password ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
        port: arg.port ?? dotenv.config()?.parsed?.DATA_BASE_PORT,
        database: arg.database ?? dotenv.config()?.parsed?.DATA_BASE_NAME
    }
}