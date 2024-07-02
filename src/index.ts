#!/usr/bin/env node

import clackCLI from "@clack/prompts";
import { promisify } from "util";
import cp from "child_process";
import colors from "ansi-colors";
import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
import databaseSelectedFunctions from "./functions/databaseSelected.functions";
import askProjectNameUtils from "./utils/askProjectName.utils";
import askInstallingRSAKeypairUtils from "./utils/askInstallingRSAKeypair.utils";
import gradient from "gradient-string";
import {consoleMessageInfo} from "./utils/info/consoleMessage.info";
import {starterKitFunction} from "./functions/starterKit.function";
import {restfullApiProjectStarterTemplate} from "./core/starterTemplate/restfullApiProject.starterTemplate";

export async function installer(): Promise<void> {
    let ora = (await import("ora")).default;
    const exec = promisify(cp.exec);
    const rm   = promisify(fs.rm);
    let projectName: string;
    const starterProject: string = await starterKitFunction();
    if (starterProject === "restfull_api_project") {
        projectName = await askProjectNameUtils();
        await restfullApiProjectStarterTemplate(projectName, ora, exec, rm);
    } else {
        switch (starterProject) {
            case "restfull_api_project":
                projectName = await askProjectNameUtils();
                await restfullApiProjectStarterTemplate(projectName, ora, exec, rm);
                break;
            case "skeleton_project":
                break;
            case "web_project":
                break;
            case "complete_restfull_project":
                break;
        }
    }
}

(async(): Promise<void> => { await installer(); })();