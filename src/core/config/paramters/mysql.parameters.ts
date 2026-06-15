import dotenv from "dotenv";
import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";
import { IPMysqlParams } from "@opticore-installer/core/abstractions/interfaces/database/pmysqlParams.interface";
import { TPMysqlParams } from "@opticore-installer/core/abstractions/types/database/mysql/pmysqlParams.type";


/**
 *
 * @param arg
 * @constructor
 */
export const PMysql: TPMysqlParams = (arg: IDBParams): IPMysqlParams => {
    return <IPMysqlParams>{
        host: arg.dbHost ?? dotenv.config()?.parsed?.DATA_BASE_HOST,
        user: arg.dbUser ?? dotenv.config()?.parsed?.DATA_BASE_USER,
        password: arg.dbPwd ?? dotenv.config()?.parsed?.DATA_BASE_PASSWORD,
        port: arg.dbPort ?? parseInt(dotenv.config()?.parsed?.DATA_BASE_PORT!)
    }
}