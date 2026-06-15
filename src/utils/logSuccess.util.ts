import { log } from "@clack/prompts";
import chalk from "chalk";

export const ULogSuccess = (logMessage: string): void => {
    log.success(chalk.green(logMessage));
}
