import { text, isCancel } from "@clack/prompts";
import { TSPromptText } from "@opticore-installer/core/abstractions/types/prompts/text/spromptText.type";
import { TSPromisePromptText } from "@opticore-installer/core/abstractions/types/prompts/text/sPromisePromptText.type";
import { UOperationCancelled } from "@opticore-installer/utils/operationCancelled.util";
import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";


/**
 *
 * @param arg
 * @constructor
 */
export const SPromptText: TSPromptText = async (arg: IPromptTextServiceParams): Promise<TSPromisePromptText | any> => {
    const textOutput: any = await text(arg.textOpt);

    return isCancel(textOutput)
        ? UOperationCancelled
        : textOutput;
}