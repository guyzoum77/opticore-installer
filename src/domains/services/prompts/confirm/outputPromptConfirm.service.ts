import { SPromptConfirm } from "@opticore-installer/domains/services/prompts/confirm/promptConfirm.service";
import { TUOperationCancelled } from "@opticore-installer/core/abstractions/types/prompts/uoperationCancelled.type";
import {
    TSOutputPromptConfirm
} from "@opticore-installer/core/abstractions/types/outputPrompt/soutputPromptConfirm.type";


/**
 *
 * @param message
 * @param initialValue
 * @constructor
 */
export const SOutputPromptConfirm: TSOutputPromptConfirm = async (
    message: string,
    initialValue: boolean
): Promise<boolean | any> => {
    return await SPromptConfirm({
        message: message,
        initialValue: initialValue,
    });
}