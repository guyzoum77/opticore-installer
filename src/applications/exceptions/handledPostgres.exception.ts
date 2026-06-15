import colors from "ansi-colors";
import fs from "fs";
import { IPostgresDBParams } from "@opticore-installer/core/abstractions/types/params/postgresDBParams.type";


/**
 *
 * @param arg
 * @param err
 */
export const handledPostgresException = (arg: IPostgresDBParams, err: any): never => {
    console.error(`${colors.red(`An error occurred while creating the database : ${err}`)}`);
    fs.rmSync(arg.projectName, { recursive: true, force: true });
    process.exit(0);
}