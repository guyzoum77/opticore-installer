import fs from "fs";
import path from "path";
import { promisify } from "util";
import { CGeneralMsg } from "@opticore-installer/core/abstractions/enums/constants/generalMsg.constant";
import { ULogInfo } from "@opticore-installer/utils/logInfo.util";
import { ULogError } from "@opticore-installer/utils/logError.util";
import { TTemplateStarter } from "@opticore-installer/core/abstractions/types/others/templateStarter.type";


/**
 *
 * @param projectName
 * path.normalize(): This function is used to normalize the path, removing any redundant
 * separators and resolving relative paths. This ensures that the path is in a consistent format.
 */
export const templateStarter: (projectName: string) => Promise<TTemplateStarter> = async(projectName: any): Promise<TTemplateStarter> => {
    const mkdir = promisify(fs.mkdir);
    if (projectName) {
        const currentPath: string = process.cwd();
        const projectPath: string = path.join(currentPath, projectName);
        if (fs.existsSync(projectPath)) {
            ULogInfo(`${projectName} ${CGeneralMsg.existingProject}`)
            fs.rmSync(projectPath, {recursive: true, force: true});
            process.exit(1);
        } else {
            fs.mkdirSync(projectPath);
        }

        const normalizedPath: string = path.normalize(projectPath);
        await mkdir(normalizedPath, { recursive: true });

        const normalizedCurrentPath: string = path.normalize(currentPath);
        await mkdir(normalizedCurrentPath, { recursive: true });

        return { normalizedCurrentPath, normalizedPath }
    } else {
        ULogError(CGeneralMsg.wrong);
        process.exit();
    }
}