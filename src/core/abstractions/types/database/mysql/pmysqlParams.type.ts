import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";
import { IPMysqlParams } from "@opticore-installer/core/abstractions/interfaces/database/pmysqlParams.interface";


export type TPMysqlParams = (arg: IDBParams) => IPMysqlParams