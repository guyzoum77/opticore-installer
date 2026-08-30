import chalk from "chalk";
import { outro, log } from "@clack/prompts";

export function endingMessageInfo(projectName: string) {
    log.success(chalk.green.bold('Your OpticoreJs project has been created successfully!'));
    console.log(`\n   ${chalk.bold('Next steps:')}`);
    console.log(`   ${chalk.dim('❯')} cd ${chalk.cyan(projectName)}`);
    console.log(`   ${chalk.dim('❯')} ${chalk.cyan('npm run start:dev')}\n`);
    console.log(`   ${chalk.dim('NB: Before running app, make sure to define in .env file application host and port.')}\n`);
    console.log(`   ${chalk.bold('Recommended packages:')}`);
    console.log(`   ${chalk.dim('❯')} ${chalk.cyan('npm install opticore-validator')} ${chalk.dim('— data schema validation with rich rules and custom messages.')}`);
    console.log(`   ${chalk.dim('❯')} ${chalk.cyan('npm install opticore-orm-orchestrator')} ${chalk.dim('— interactive model/entity generator for Prisma, TypeORM, Drizzle ORM, MikroORM and Sequelize.')}\n`);
    outro(chalk.dim('To install opticore components: ') + chalk.green('npx opticore list'));
}
