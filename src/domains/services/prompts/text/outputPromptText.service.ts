import { SPromptText } from "@opticore-installer/domains/services/prompts/text/promptText.service";
import { SValidate } from "@opticore-installer/domains/services/validate.service";


/**
 *
 * @param message
 * @param placeholder
 * @param messageInvalidValue
 * @param messageBadPattern
 * @param projectPath
 * @param regex
 * @param initialValue
 * @param defaultValue
 * @constructor
 */
export const SOutputPromptText = async (message: string,
                                        placeholder: string,
                                        messageInvalidValue: string,
                                        messageBadPattern: string,
                                        regex: string,
                                        projectPath?: string,
                                        initialValue?: string,
                                        defaultValue?: string, ) => {
    return await SPromptText({
        textOpt: {
            initialValue: initialValue,
            defaultValue: defaultValue,
            message: message,
            placeholder: placeholder,
            validate: (value: string | undefined): string | undefined => SValidate(value, messageInvalidValue, messageBadPattern, regex)
        },
        projectPath: projectPath!
    });
}