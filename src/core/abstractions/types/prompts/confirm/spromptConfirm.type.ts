import {
    IPromptConfirmServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptConfirmServiceParams.interface";
import {
    TSPromisePromptConfirm
} from "@opticore-installer/core/abstractions/types/prompts/confirm/sPromisePromptConfirm.type";


export type TSPromptConfirm = (arg: IPromptConfirmServiceParams) => TSPromisePromptConfirm