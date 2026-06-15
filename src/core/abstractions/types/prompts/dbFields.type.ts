import { TPasswordField } from "@opticore-installer/core/abstractions/types/prompts/passwordField.type";
import { TPromptableField } from "@opticore-installer/core/abstractions/types/prompts/promptableField.type";

export type TDbFields<T extends string> = {
    [K in T]: K extends `${string}Password` | `${string}Pwd` ? TPasswordField : TPromptableField;
};