import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";

export interface IEnvParams {
    dbName: string | ((arg: IPromptTextServiceParams) => never);
    dbUser: string | ((arg: IPromptTextServiceParams) => never) | undefined;
    dbPwd: string | ((arg: IPromptTextServiceParams) => never) | undefined;
    dbHost: string | ((arg: IPromptTextServiceParams) => never) | undefined;
    dbPort: number | string | ((arg: IPromptTextServiceParams) => never);
}