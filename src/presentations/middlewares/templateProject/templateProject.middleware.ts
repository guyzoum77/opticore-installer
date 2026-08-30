import { SProjectCreation } from "@opticore-installer/presentations/starter/projectCreation.starter";
import { SUpdateEnv } from "@opticore-installer/domains/services/updateEnv.service";
import { IEnvVariable } from "@opticore-installer/core/abstractions/interfaces/environment/envVariable.interface";

export const MTemplateProject = async(
    repoGit: string,
    projectPath: string,
    currentPath: string,
    callback: (arg: string[]) => Promise<void>,
    arg: IEnvVariable,
    projectName: string,
    argumentConnection?: string
): Promise<void> => {
    await SProjectCreation(repoGit, projectPath, currentPath, projectName);
    new SUpdateEnv(arg, argumentConnection);
    await callback([]);
}