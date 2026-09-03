import cfonts from "cfonts";
import chalk from "chalk";

export const UWelcomeMessage: () => void = (): void => {
    cfonts.say('OpticoreJS', {
        font: 'block',
        align: 'left',
        colors: ['#D4E4FF', '#427ff5'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
    });

    const name = chalk.bold.hex('#003A9F');
    const dim  = chalk.bold.hex('#D4E4FF');

    console.log(`${name('OPTICORE  I N S T A L L E R')}`);
    console.log(`${dim('Create · Configure · Deploy')}\n`);
    console.log(`${chalk.bold.dim('Documentation')}  ${chalk.underline.cyan('https://github.com/guyzoum77/opticore-installer')}\n`);
}
