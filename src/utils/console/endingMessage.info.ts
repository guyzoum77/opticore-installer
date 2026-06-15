import chalk from "chalk";
import { outro, log } from "@clack/prompts";

export function endingMessageInfo(projectName: string) {
    log.success(chalk.green.bold('Your OpticoreJs project has been created successfully!'));
    console.log(`\n   ${chalk.bold('Next steps:')}`);
    console.log(`   ${chalk.dim('❯')} cd ${chalk.cyan(projectName)}`);
    console.log(`   ${chalk.dim('❯')} ${chalk.cyan('npm run start:dev')}\n`);
    console.log(`   ${chalk.dim('NB: Before running app, make sure to define in .env file application host and port.')}\n`);
    outro(chalk.dim('To install opticore components: ') + chalk.green('npx opticore list'));
}
