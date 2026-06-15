import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";


export interface ISFetchCredentialsDBParams {
    databaseHost: string | ((arg: IPromptTextServiceParams) => never) | undefined,
    databaseName: string | ((arg: IPromptTextServiceParams) => never),
    databasePassword: string | ((arg: IPromptTextServiceParams) => never) | undefined,
    databasePort: number | string | ((arg: IPromptTextServiceParams) => never),
    databaseUser: string | ((arg: IPromptTextServiceParams) => never) | undefined,
    projectPath: string
}