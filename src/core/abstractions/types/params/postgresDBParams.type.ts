import { ClientConfig } from "pg";

export type IPostgresDBParams = Pick<ClientConfig, "user" | "database" | "password" | "port" | "host"> & {
    projectName: string;
};