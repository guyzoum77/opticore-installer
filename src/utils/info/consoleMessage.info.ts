import gradient from "gradient-string";
import colors from "ansi-colors";

export function consoleMessageInfo(projectName: any) {
    console.log(gradient(`cyan`, `pink`, `orange`)(`╭───────────────────────────────────────────────────────────────────────────────────────────────────╮
│               🎉  Your OpticoreJs project opticore has been created successfully!                 │
╰───────────────────────────────────────────────────────────────────────────────────────────────────╯`));
    console.log(`❯ cd ${colors.cyan(`${projectName}`)} 
❯ run this command : ${colors.cyan(`npm run start:dev`)}`);
    console.log(`NB: Before running app, make sure to define in .env file application host and port.\n`);
    console.log(`To use OptiCoreJs command to install some feature: `);
    console.log(`run : ${colors.cyan(`npx opticore list`)} to know the opticore components to install.`);
}