import { TUOperationCancelled } from "@opticore-installer/core/abstractions/types/prompts/uoperationCancelled.type";

export type TSOutputPromptConfirm = (message: string, initialValue: boolean) => Promise<boolean | TUOperationCancelled>