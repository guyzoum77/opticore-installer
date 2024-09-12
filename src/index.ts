#!/usr/bin/env node

import askProjectNameUtils from "./utils/askProjectName.utils";
import {starterKitFunction} from "./functions/starterKit.function";
import {restfullApiProjectStarterTemplate} from "./core/starterTemplate/restfullApiProject.starterTemplate";

export async function installer(): Promise<void> {

    let projectName: string;
    const starterProject: string = await starterKitFunction();
    switch (starterProject) {
        case "restfull_api_project":
            projectName = await askProjectNameUtils();
            await restfullApiProjectStarterTemplate(projectName);
            break;
        case "skeleton_project":
            break;
        case "web_project":
            break;
        case "complete_api_restfull_project":
            break;
        case "complete_web_project":
            break;
    }
}

(async(): Promise<void> => { await installer(); })();