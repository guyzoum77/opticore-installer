import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";

export type TPromptableField = string | ((arg: IPromptTextServiceParams) => never);
