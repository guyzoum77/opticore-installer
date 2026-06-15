import { confirm, isCancel } from "@clack/prompts";
import { UOperationCancelled } from "@opticore-installer/utils/operationCancelled.util";
import { TSPromptConfirm } from "@opticore-installer/core/abstractions/types/prompts/confirm/spromptConfirm.type";
import { TSPromisePromptConfirm } from "@opticore-installer/core/abstractions/types/prompts/confirm/sPromisePromptConfirm.type";
import {
    IPromptConfirmServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptConfirmServiceParams.interface";
import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";


/**
 *
 * @param arg
 * @constructor
 */
export const SPromptConfirm: (arg: IPromptConfirmServiceParams) => Promise<boolean |
    ((arg: IPromptTextServiceParams["projectPath"]) => never)> = async(arg: IPromptConfirmServiceParams) => {
    const outputConfirm: boolean | symbol = await confirm(arg);

    return isCancel(outputConfirm)
        ? UOperationCancelled
        : outputConfirm;
}