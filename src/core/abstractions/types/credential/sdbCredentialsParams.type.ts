import { IDbCredentials } from "@opticore-installer/core/abstractions/interfaces/dbCredentials/dbCredentials.interface";

export type TSDbCredentialsParams = (projectPath: string) => Promise<IDbCredentials>