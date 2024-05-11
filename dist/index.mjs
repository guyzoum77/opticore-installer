#!/usr/bin/env node

// node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import clackCLI2 from "@clack/prompts";
import { promisify } from "util";
import cp from "child_process";
import colors2 from "ansi-colors";
import path3 from "path";
import fs2 from "fs";

// src/functions/databaseSelected.functions.ts
import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import fs from "fs";
import path2 from "path";
async function databaseSelectedFunctions(file) {
  const databaseSelected = await clackCLI.select({
    message: "Which database would you use ?",
    initialValue: ["mysql"],
    options: [
      { label: "MySQL", value: ["mysql"] },
      { label: "Mongo DB", value: ["mongo_db"] },
      { label: "Postgres", value: ["postgres"] }
    ]
  });
  if (clackCLI.isCancel(databaseSelected)) {
    console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
    process.exit(0);
  }
  let fileContent;
  let getFileContent;
  const filePath = path2.join(__dirname, "../dist/utils/template");
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
    getFileContent = fs.readFileSync(`${fileContent}`, "utf8");
  } catch (err) {
    console.log(`Error reading file: ${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
  }
  try {
    fs.writeFile(
      file,
      `${getFileContent}`,
      { flag: "a+" },
      (err) => {
        if (err) {
          console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
        }
      }
    );
  } catch (err) {
    console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
  }
}

// src/index.ts
async function installer() {
  let ora = (await import("ora")).default;
  const exec = promisify(cp.exec);
  const rm = promisify(fs2.rm);
  const projectName = await clackCLI2.text(
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
  if (clackCLI2.isCancel(projectName)) {
    console.log(`${colors2.bgRed(`${colors2.white("Operation cancelled.")}`)}`);
    process.exit(0);
  }
  if (projectName) {
    const currentPath = process.cwd();
    const projectPath = path3.join(currentPath, projectName);
    const gitRepo = "git@github.com:guyzoum77/opticore-template.git";
    if (fs2.existsSync(projectPath)) {
      console.log(`${colors2.cyan(`${colors2.white(`${projectName} already exist, please give it another name.`)}`)}`);
      process.exit(1);
    } else {
      fs2.mkdirSync(projectPath);
    }
    try {
      const gitSpinner = ora("Downloading files and project creation ...").start();
      await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
      gitSpinner.succeed();
      const cleanSpinner = ora("Removing useless files").start();
      const rmGit = rm(path3.join(projectPath, ".git"), { recursive: true, force: true });
      const rmBin = rm(path3.join(currentPath, "opticore-installer"), { recursive: true, force: true });
      await Promise.all([rmGit, rmBin]);
      process.chdir(projectPath);
      await exec("npm uninstall ora cli-spinners util @clack/prompts path fs");
      cleanSpinner.succeed();
      const npmSpinner = ora("Installing dependencies...").start();
      await exec("npm install");
      npmSpinner.succeed();
      await databaseSelectedFunctions(`${projectPath}/src/infrastructure/server/app.server.ts`);
      console.log(`${colors2.cyan(`${colors2.white(`${projectName} has been created successfully.`)}`)}`);
    } catch (err) {
      fs2.rmSync(projectPath, { recursive: true, force: true });
      console.error(err);
      process.exit(1);
    }
  } else {
    console.log(`${colors2.bgRed(`${colors2.white("Something went wrong.")}`)}`);
    process.exit(0);
  }
}
(async () => {
  await installer();
})();
export {
  installer
};
