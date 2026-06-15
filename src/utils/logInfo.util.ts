import { log } from "@clack/prompts";
import chalk from "chalk";
import { TULogInfo } from "@opticore-installer/core/abstractions/types/others/ulogInfo.type";

export const ULogInfo: TULogInfo = (logMessage: string): void => {
    log.info(chalk.dim(logMessage));
}
