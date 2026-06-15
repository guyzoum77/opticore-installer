import {SPromptPassword} from "@opticore-installer/domains/services/prompts/password/promptPassword.service";
import {SValidate} from "@opticore-installer/domains/services/validate.service";


/**
 *
 * @param message
 * @constructor
 */
export const SOutputPromptPassword = async (message: string) => {
    return await SPromptPassword({
        message: message,
        mask: "*",
        validate: (value: string | undefined): string | undefined => SValidate(
            value,
            "The password is required",
            "The password can not be blank",
            "[a-zA-Z0-9\\P{Z}]"
        )
    });
}
