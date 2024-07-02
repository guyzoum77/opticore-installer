#!/usr/bin/env node

import { promisify } from "util";
import cp from "child_process";
import fs from "fs";
import askProjectNameUtils from "./utils/askProjectName.utils";
import {starterKitFunction} from "./functions/starterKit.function";
import {restfullApiProjectStarterTemplate} from "./core/starterTemplate/restfullApiProject.starterTemplate";

export async function installer(): Promise<void> {
    let ora = (await import("ora")).default;
    const exec = promisify(cp.exec);
    const rm   = promisify(fs.rm);
    let projectName: string;
    const starterProject: string = await starterKitFunction();
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

(async(): Promise<void> => { await installer(); })();