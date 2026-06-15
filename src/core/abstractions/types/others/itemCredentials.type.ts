import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";

export type TItemCredentials = string | ((arg: IPromptTextServiceParams) => never);