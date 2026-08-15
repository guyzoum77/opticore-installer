import { GetLatestVersion } from "@opticore-installer/applications/services/packagesVersion.service";



export const UpdateOpticoreDeps = async (exec: Function, deps: Record<string, string>): Promise<Record<string, string>> => {
    const updated: Record<string, string> = { ...deps };
    const opticorePackages: string[] = Object.keys(deps).filter((name: string): boolean => name.startsWith("opticore-"));

    await Promise.all(opticorePackages.map(async (name: string): Promise<void> => {
        const latest: string | null = await GetLatestVersion(exec, name);
        if (latest) updated[name] = `^${latest}`;
    }));

    return updated;
};