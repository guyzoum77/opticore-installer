import path from "path";
import fs from "fs";
import colors from "ansi-colors";
import askInstallingRSAKeypairUtils from "../../utils/askInstallingRSAKeypair.utils";
import {databaseSelectedFunctions} from "../../functions/databaseSelected.functions";
import {consoleMessageInfo} from "../../utils/info/consoleMessage.info";
import {shellEscape} from "../shellEscape";
import {promisify} from "util";


/**
 *
 * @param projectName
 * path.normalize(): This function is used to normalize the path, removing any redundant
 * separators and resolving relative paths. This ensures that the path is in a consistent format.
 */
export async function restfullApiProjectStarterTemplate(projectName: any) {
    const mkdir = promisify(fs.mkdir);
    if (projectName) {
        const currentPath: string = process.cwd();
        const projectPath: string = path.join(currentPath, projectName);
        if (fs.existsSync(projectPath)) {
            console.log(`${colors.cyan(`${colors.white(`${projectName} already exist, please give it another name.`)}`)}`);
            fs.rmSync(projectPath, {recursive: true, force: true});
            process.exit(1);
        } else {
            fs.mkdirSync(projectPath);
        }

        const normalizedPath: string = path.normalize(projectPath);
        await mkdir(normalizedPath, { recursive: true });

        const normalizedCurrentPath: string = path.normalize(currentPath);
        await mkdir(normalizedCurrentPath, { recursive: true });

        const escapedProjectPath: string = shellEscape(normalizedPath);
        const escapedCurrentPath: string = shellEscape(normalizedCurrentPath);
        await databaseSelectedFunctions(escapedProjectPath, escapedCurrentPath);

        try {
            await askInstallingRSAKeypairUtils(projectPath);
            consoleMessageInfo(projectName);
            process.exit();
        } catch (err: any) {
            fs.rmSync(projectPath, {recursive: true, force: true});
            console.error(err);
            process.exit(1);
        }
    } else {
        console.log(`${colors.bgRed(`${colors.white("Something went wrong.")}`)}`);
        process.exit(0);
    }
}