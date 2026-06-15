import { select, isCancel } from "@clack/prompts";
import { UOperationCancelled } from "@opticore-installer/utils/operationCancelled.util";
import {
    IPromptSelectServicesParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptSelectServicesParams.interface";





/**
 *
 * @param arg
 * @constructor
 */
export const SPromptSelect = async (arg: IPromptSelectServicesParams) => {
    const outputSelect: string[] | symbol =  await select(arg);

    return isCancel(outputSelect)
        ? UOperationCancelled
        : outputSelect;
}