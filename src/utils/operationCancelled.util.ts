import { cancel } from "@clack/prompts";
import colors from "ansi-colors";
import fs from "fs";
import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";

export const UOperationCancelled = (arg: IPromptTextServiceParams["projectPath"]) => {
    cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
    if (arg) {
        fs.rmSync(arg, { recursive: true, force: true });
    }
    process.exit(130);
}
