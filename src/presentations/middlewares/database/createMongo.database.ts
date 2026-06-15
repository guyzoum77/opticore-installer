import fs from "fs";
import colors from "ansi-colors";
import { Db, MongoClient } from "mongodb";
import { ULogSuccess } from "@opticore-installer/utils/logSuccess.util";
import { CMongoText } from "@opticore-installer/core/abstractions/enums/constants/mongoOutputText.constant";
import { ULogInfo } from "@opticore-installer/utils/logInfo.util";
import { handledMongoDBException } from "@opticore-installer/applications/exceptions/handledMongoDB.exception";
import { SOutputPromptText } from "@opticore-installer/domains/services/prompts/text/outputPromptText.service";
import { configMongoUrlConfig } from "@opticore-installer/core/config/uri/configMongoUrl.config";
import { PMongoClient } from "@opticore-installer/core/config/paramters/mongoClient.parameter";
import { IDBParams } from "@opticore-installer/core/abstractions/interfaces/params/dbParams.interface";
import {
    TCreateMongoDBDatabase
} from "@opticore-installer/core/abstractions/types/database/mongo/createMongoDBDatabase.type";
import {
    IPromptTextServiceParams
} from "@opticore-installer/core/abstractions/interfaces/prompts/promptTextServiceParams.interface";


/**
 *
 * @param arg
 */
export const createMongoDatabase: TCreateMongoDBDatabase = async (arg: IDBParams): Promise<void> => {
    try {
        const client: MongoClient = new MongoClient(configMongoUrlConfig(arg.dbHost, arg.dbPort), PMongoClient(arg.dbUser!, arg.dbPwd!));
        await client.connect();
        const mongoOutputText: string | ((arg: IPromptTextServiceParams) => never) = await SOutputPromptText(CMongoText.msg, CMongoText.pHolder, CMongoText.invalidValue, CMongoText.badPattern, arg.projectPath);

        if (mongoOutputText) {
            const db: Db = client.db(arg.dbName);
            typeof mongoOutputText === "string" ? await db.createCollection(mongoOutputText) : ((): never => { console.error(mongoOutputText); process.exit() });
            ULogSuccess(`${colors.green(`Your database ${colors.bgGreen(`${colors.white(`${arg.dbName}`)}`)} has been created successfully.`)}`);
        } else {
            ULogInfo(CMongoText.unReachable)
            fs.rmSync(arg.projectPath, { recursive: true, force: true });
            process.exit(0);
        }

    } catch (e: any) {
        handledMongoDBException(e, arg.dbPort, arg.dbHost!, arg.projectPath);
    }
}