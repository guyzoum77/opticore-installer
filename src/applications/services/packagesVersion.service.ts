export const GetLatestVersion = async (exec: Function, pkgName: string): Promise<string | null> => {
    try {
        const { stdout } = await exec(`npm view ${pkgName} version`);
        return stdout.trim();
    } catch {
        return null;
    }
};