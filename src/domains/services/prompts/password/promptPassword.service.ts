import { password, isCancel } from "@clack/prompts";
import { UOperationCancelled } from "@opticore-installer/utils/operationCancelled.util";
import {
    ISPromptPasswordParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/sPromptPasswordParams.interface";


/**
 *
 * @param arg
 * @constructor
 */
export const SPromptPassword = async(arg: ISPromptPasswordParams) => {
    const outputConfirm: string | symbol = await password(arg);
    return isCancel(outputConfirm)
        ? UOperationCancelled
        : outputConfirm;
}