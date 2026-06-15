import {
    ISFetchCredentialsDBParams
} from "@opticore-installer/core/abstractions/interfaces/dbCredentials/sfetchCredentialsDBParams.interface";
import { IEnvParams } from "@opticore-installer/core/abstractions/interfaces/params/envParams.interface";
import { IMdbCredentials } from "@opticore-installer/core/abstractions/interfaces/dbCredentials/mdbCredentials.interface";


export interface ISFetchCredentials {
    dbCredentials: IMdbCredentials | void;
    fetchParams: string;
    dbParams: ISFetchCredentialsDBParams;
    envParams: IEnvParams;
}