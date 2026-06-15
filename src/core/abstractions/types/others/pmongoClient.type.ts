import { IPMongoClient } from "@opticore-installer/core/abstractions/interfaces/database/pmongoClient.interface";

export type TPMongoClient = (databaseUser: string, databasePassword: string) => IPMongoClient