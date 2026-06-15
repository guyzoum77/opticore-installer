import { log } from "@clack/prompts";
import chalk from "chalk";

export const ULogError: (logMessage: string) => void = (logMessage: string): void => {
    log.error(chalk.red(logMessage));
}
