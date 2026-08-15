import { intro, cancel } from "@clack/prompts";
import chalk from "chalk";
import colors from "ansi-colors";
import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";
import { UWelcomeMessage } from "@opticore-installer/utils/console/welcomeMessage.util";
import { SOutputPromptSelect } from "@opticore-installer/domains/services/prompts/select/outputPromptSelect.service";
import { StarterOptions } from "@opticore-installer/presentations/starter/starterOptions.starter";
import { CGeneralMsg } from "@opticore-installer/core/abstractions/enums/constants/generalMsg.constant";
import { SOutputPromptText } from "@opticore-installer/domains/services/prompts/text/outputPromptText.service";
import { templateStarter } from "@opticore-installer/presentations/starter/template.starter";
import * as process from "node:process";
import { MSelectDB } from "@opticore-installer/presentations/middlewares/selectDB.middleware";
import { SShellEscape } from "@opticore-installer/domains/services/shellEscape.service";
import { TTemplateStarter } from "@opticore-installer/core/abstractions/types/others/templateStarter.type";


export const installerCore: () => Promise<void> = async(): Promise<void> => {
    let projectName: string | ((arg: IPromptTextServiceParams) => never);
    UWelcomeMessage();
    intro(chalk.bgYellow.black('  Opticore Framework Installer  '));

    const starter = await SOutputPromptSelect(StarterOptions);
    starter instanceof Function
        ? ((): never => {
            cancel(colors.bgRed(colors.white('  Operation cancelled  ')));
            process.exit(130);
        })()
        : (starter as string[]).map(async (value: string): Promise<void> => {
            switch (value) {
                case CGeneralMsg.starterInitValue:
                    projectName = await SOutputPromptText(
                        CGeneralMsg.projectNameMessage,
                        CGeneralMsg.projectNamePlaceholder,
                        CGeneralMsg.projectNameInvalidValue,
                        CGeneralMsg.projectNameBadPattern,
                        "^[a-zA-Z0-9]+$"
                    );
                    if (typeof projectName === "string") {
                        const tpl: TTemplateStarter = await templateStarter(projectName);
                        const escapedProjectPath: string = SShellEscape(tpl.normalizedPath);
                        const escapedCurrentPath: string = SShellEscape(tpl.normalizedCurrentPath);
                        await MSelectDB(escapedProjectPath, escapedCurrentPath, projectName)
                    }
                    break;
            }
        });
}