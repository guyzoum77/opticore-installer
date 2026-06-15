import {
    IMTemplateProjectParams
} from "@opticore-installer/core/abstractions/interfaces/params/mtemplateProjectParams.interface";
import { IEnvVariable } from "@opticore-installer/core/abstractions/interfaces/environment/envVariable.interface";


export type TMTemplateProject = (arg: IMTemplateProjectParams, envVar: IEnvVariable) => Promise<void>