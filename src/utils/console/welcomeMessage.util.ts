import cfonts from "cfonts";
import chalk from "chalk";

export const UWelcomeMessage: () => void = (): void => {
    cfonts.say('OpticoreJS', {
        font: 'block',
        align: 'left',
        colors: ['yellow', '#FF6B35'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
    });

    const orange = chalk.bold.hex('#FF6B35');
    const dim    = chalk.bold.yellow;

    console.log(`          ${orange('OPTICORE  F R A M E W O R K   I N S T A L L E R')}`);
    console.log(`                ${dim('Create · Configure · Deploy')}\n`);
    console.log(`   ${chalk.bold.dim('Documentation')}  ${chalk.underline.cyan('https://github.com/guyzoum77/opticore-installer')}\n`);
}
