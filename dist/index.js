#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  installer: () => installer
});
module.exports = __toCommonJS(src_exports);
var import_prompts2 = __toESM(require("@clack/prompts"));
var import_util = require("util");
var import_child_process = __toESM(require("child_process"));
var import_ansi_colors2 = __toESM(require("ansi-colors"));
var import_path2 = __toESM(require("path"));
var import_fs2 = __toESM(require("fs"));

// src/functions/databaseSelected.functions.ts
var import_prompts = __toESM(require("@clack/prompts"));
var import_ansi_colors = __toESM(require("ansi-colors"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
async function databaseSelectedFunctions(file) {
  const databaseSelected = await import_prompts.default.select({
    message: "Which database would you use ?",
    initialValue: ["mysql"],
    options: [
      { label: "MySQL", value: ["mysql"] },
      { label: "Mongo DB", value: ["mongo_db"] },
      { label: "Postgres", value: ["postgres"] }
    ]
  });
  if (import_prompts.default.isCancel(databaseSelected)) {
    console.log(`${import_ansi_colors.default.bgRed(`${import_ansi_colors.default.white("Operation cancelled.")}`)}`);
    process.exit(0);
  }
  let fileContent;
  let getFileContent;
  const filePath = import_path.default.join(__dirname, "../dist/utils/template");
  switch (databaseSelected[0]) {
    case "mysql":
      fileContent = filePath + "/appServerWithMySQLDBConfig.txt";
      break;
    case "mongo_db":
      fileContent = filePath + "/appServerWithMongoDBConfig.txt";
      break;
    case "postgres":
      fileContent = filePath + "/appServerWithPostgresDBConfig.txt";
      break;
  }
  try {
    getFileContent = import_fs.default.readFileSync(`${fileContent}`, "utf8");
  } catch (err) {
    console.log(`Error reading file: ${import_ansi_colors.default.bgRed(`${import_ansi_colors.default.white(`${err.message}`)}`)}`);
  }
  try {
    import_fs.default.writeFile(
      file,
      `${getFileContent}`,
      { flag: "a+" },
      (err) => {
        if (err) {
          console.log(`${import_ansi_colors.default.bgRed(`${import_ansi_colors.default.white(`${err.message}`)}`)}`);
        }
      }
    );
  } catch (err) {
    console.log(`${import_ansi_colors.default.bgRed(`${import_ansi_colors.default.white(`${err.message}`)}`)}`);
  }
}

// src/index.ts
async function installer() {
  let ora = (await import("ora")).default;
  const exec = (0, import_util.promisify)(import_child_process.default.exec);
  const rm = (0, import_util.promisify)(import_fs2.default.rm);
  const projectName = await import_prompts2.default.text(
    {
      message: "Enter the name's project :",
      placeholder: "opticore",
      validate: (value) => {
        let pattern = new RegExp("^[a-z_-]+$");
        if (!value) {
          return "Please database name can't be empty.";
        }
        if (!pattern.test(value)) {
          return "Please enter a valide database name.";
        }
      }
    }
  );
  if (import_prompts2.default.isCancel(projectName)) {
    console.log(`${import_ansi_colors2.default.bgRed(`${import_ansi_colors2.default.white("Operation cancelled.")}`)}`);
    process.exit(0);
  }
  if (projectName) {
    const currentPath = process.cwd();
    const projectPath = import_path2.default.join(currentPath, projectName);
    const gitRepo = "git@github.com:guyzoum77/opticore-template.git";
    if (import_fs2.default.existsSync(projectPath)) {
      console.log(`${import_ansi_colors2.default.cyan(`${import_ansi_colors2.default.white(`${projectName} already exist, please give it another name.`)}`)}`);
      process.exit(1);
    } else {
      import_fs2.default.mkdirSync(projectPath);
    }
    try {
      const gitSpinner = ora("Downloading files and project creation ...").start();
      await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
      gitSpinner.succeed();
      const cleanSpinner = ora("Removing useless files").start();
      const rmGit = rm(import_path2.default.join(projectPath, ".git"), { recursive: true, force: true });
      const rmBin = rm(import_path2.default.join(currentPath, "opticore-installer"), { recursive: true, force: true });
      await Promise.all([rmGit, rmBin]);
      process.chdir(projectPath);
      await exec("npm uninstall ora cli-spinners util @clack/prompts path fs");
      cleanSpinner.succeed();
      const npmSpinner = ora("Installing dependencies...").start();
      await exec("npm install");
      npmSpinner.succeed();
      await databaseSelectedFunctions(`${projectPath}/src/infrastructure/server/app.server.ts`);
      console.log(`${import_ansi_colors2.default.cyan(`${import_ansi_colors2.default.white(`${projectName} has been created successfully.`)}`)}`);
    } catch (err) {
      import_fs2.default.rmSync(projectPath, { recursive: true, force: true });
      console.error(err);
      process.exit(1);
    }
  } else {
    console.log(`${import_ansi_colors2.default.bgRed(`${import_ansi_colors2.default.white("Something went wrong.")}`)}`);
    process.exit(0);
  }
}
(async () => {
  await installer();
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  installer
});
