import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";

export type TSPromptText = (arg: IPromptTextServiceParams) =>  Promise<((arg: IPromptTextServiceParams) => never) | string>;