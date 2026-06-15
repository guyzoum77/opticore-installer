import dotenv from "dotenv";
import { IPMongoClient } from "@opticore-installer/core/abstractions/interfaces/database/pmongoClient.interface";
import { TPMongoClient } from "@opticore-installer/core/abstractions/types/others/pmongoClient.type";


/**
 *
 * @param databaseUser
 * @param databasePassword
 * @constructor
 */
export const PMongoClient: TPMongoClient = (databaseUser: string, databasePassword: string): IPMongoClient => {
    return {
        auth: {
            username: databaseUser ?? dotenv.config()!.parsed!.DATA_BASE_USER,
            password: databasePassword ?? dotenv.config()!.parsed!.DATA_BASE_PASSWORD
        }
    }
}