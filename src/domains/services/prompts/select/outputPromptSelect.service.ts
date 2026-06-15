import { SPromptSelect as promptSelect } from "@opticore-installer/domains/services/prompts/select/promptSelect.service";
import {
    IPromptSelectServicesParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptSelectServicesParams.interface";




/**
 *
 * @param arg
 * @constructor
 */
export const SOutputPromptSelect = async (arg: IPromptSelectServicesParams) => {
    return await promptSelect({
        message: arg.message,
        initialValue: arg.initialValue,
        options: arg.options
    });
}