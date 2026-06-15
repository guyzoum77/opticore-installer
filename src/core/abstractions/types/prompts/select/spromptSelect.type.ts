import {
    IPromptSelectServicesParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptSelectServicesParams.interface";
import {
    TSPromisePromptSelect
} from "@opticore-installer/core/abstractions/types/prompts/select/sPromisePromptSelect.type";


export type TSPromptSelect = (arg: IPromptSelectServicesParams) => TSPromisePromptSelect