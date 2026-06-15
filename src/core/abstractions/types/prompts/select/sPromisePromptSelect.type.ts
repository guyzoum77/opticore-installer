import { TUOperationCancelled } from "@opticore-installer/core/abstractions/types/prompts/uoperationCancelled.type";

export type TSPromisePromptSelect = Promise<string[] | TUOperationCancelled>;