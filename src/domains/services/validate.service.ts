import {TSValidate} from "@opticore-installer/core/abstractions/types/others/svalidate.type";


/**
 *
 * @param value
 * @param messageInvalidValue
 * @param messageBadPattern
 * @param regex
 * @constructor
 */
export const SValidate = (value: any,
                          messageInvalidValue: string,
                          messageBadPattern: string,
                          regex?: string) => {

    let pattern: RegExp = new RegExp(regex!);
    if (!value) {
        return messageInvalidValue;
    }
    if (!pattern.test(value)) {
        return messageBadPattern;
    }
}