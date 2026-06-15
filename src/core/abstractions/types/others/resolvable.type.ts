import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";


export type TResolvable<T> = T | ((arg: IPromptTextServiceParams) => never);
