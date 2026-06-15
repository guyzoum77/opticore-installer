import {
    IPromptSelectServicesParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptSelectServicesParams.interface";
import { TUOperationCancelled } from "@opticore-installer/core/abstractions/types/prompts/uoperationCancelled.type";

export type TSOutputPromptSelect = (arg: IPromptSelectServicesParams) => Promise<string[] | TUOperationCancelled>