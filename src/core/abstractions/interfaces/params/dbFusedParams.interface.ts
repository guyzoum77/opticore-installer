import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";
import { TUOperationCancelled } from "@opticore-installer/core/abstractions/types/prompts/uoperationCancelled.type";


export interface IDBFusedParams {
    host: string | undefined | ((arg: IPromptTextServiceParams) => never);
    user: string | undefined | ((arg: IPromptTextServiceParams) => never);
    password: string | undefined | TUOperationCancelled;
    name: string | ((arg: IPromptTextServiceParams) => never);
    port: number | string | ((arg: IPromptTextServiceParams) => never);
    projectPath: string;
}