import { IEnvVariable } from "@opticore-installer/core/abstractions/interfaces/environment/envVariable.interface";

export interface IDBParams extends IEnvVariable {
    projectPath: string;
}