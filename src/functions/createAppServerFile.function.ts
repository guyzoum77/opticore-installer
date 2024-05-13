import fs from "fs";
import colors from "ansi-colors";

export default function createAppServerFileFunction(fileContent: any, file: any) {
    let getFileContent: any;
    try {
        getFileContent = fs.readFileSync(`${fileContent}`, "utf8");
    } catch (err: any) {
        console.log(`Error reading file: ${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
    }

    try {
        fs.writeFile(
            file,
            getFileContent,
            { flag: "a+" },
            (err: any) => {
                if (err) {
                    console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
                }
            }
        );
    } catch (err: any) {
        console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
    }
}