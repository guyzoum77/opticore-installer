export interface IMTemplateProjectParams {
    repoGit: string,
    projectPath: string,
    currentPath: string,
    callback: (arg: string[]) => Promise<void>,
    dbCredentials: string[],
}