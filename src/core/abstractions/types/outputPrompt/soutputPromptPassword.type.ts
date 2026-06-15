import { TUOperationCancelled } from "@opticore-installer/core/abstractions/types/prompts/uoperationCancelled.type";

export type TSOutputPromptPassword = (
    message: string,
    mask: string,
    messageInvalidValue: string,
    messageBadPattern: string,
    regex?: string
) => Promise<string | TUOperationCancelled>
