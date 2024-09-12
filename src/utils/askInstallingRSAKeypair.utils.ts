import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import fs from "fs";
import crypto, {KeyPairSyncResult} from "crypto";
import {rsaKeyPairOptionsFunction} from "../functions/rsaKeyPairOptions.function";
import path from "path";
import {createFileFunction} from "../functions/createFile.function";

export default async function askInstallingRSAKeypairUtils(projectPath: any) {
    let ora = (await import("ora")).default;
    const asymmetricRSAKeypair: symbol | string[] =  await clackCLI.select({
        message: "Do you want install asymmetric rsa keypair ?",
        initialValue: ["rsa_keypair"],
        options: [
            {label: "Asymmetric RSA Keypair", value: ["rsa_keypair"]},
            {label: "I don't want it", value: ['no_rsa_keypair']},
        ],
    });

    if (clackCLI.isCancel(asymmetricRSAKeypair)) {
        console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
        fs.rmSync(projectPath, { recursive: true, force: true });
        process.exit(0);
    }

    if (asymmetricRSAKeypair[0] === "rsa_keypair") {
        let keyPairDir: string = process.cwd() + "/src/core/constants/keypair";
        let keyPair: KeyPairSyncResult<string, string> = crypto.generateKeyPairSync("rsa", rsaKeyPairOptionsFunction());
        const rsaSpinner = ora("Installing asymmetric RSA Keypair\n").start();

        if (fs.existsSync(path.join(keyPairDir, 'id_rsa_pub.pem')) && fs.existsSync(path.join(keyPairDir, 'id_rsa_priv.pem'))) {
            console.log(`${colors.bgCyan(`${colors.white(`RSA Keypair is already exist.`)}`)}`);
            process.exit();
        }

        if (fs.existsSync(keyPair.privateKey) && fs.existsSync(keyPair.publicKey)) {
            console.log(`${colors.bgCyan(`${colors.white(`RSA Keypair is already exist.`)}`)}`);
            process.exit();
        } else {
            fs.mkdirSync(keyPairDir, {recursive: true});
            fs.writeFileSync(path.join(keyPairDir, 'id_rsa_pub.pem'), keyPair.publicKey);
            fs.writeFileSync(path.join(keyPairDir, 'id_rsa_priv.pem'), keyPair.privateKey);

            const keysPath: string = process.cwd() + "/src/core/constants/keys";
            fs.mkdirSync(keysPath, {recursive: true});

            let filePath: string = path.join(__dirname, "../dist/utils/template");
            createFileFunction(
                keysPath + '/private.key.ts',
                filePath + "/privateKeypairContent.txt"
            );
            createFileFunction(
                keysPath + "/public.key.ts",
                filePath + "/publicKeypairContent.txt"
            );

            rsaSpinner.succeed();

            console.log(`${colors.bgGreen(`${colors.white(`The RSA Keypair is been created successfully.`)}`)}`);
            console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keypair/public.key.ts`)}`);
            console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keypair/private.key.ts`)}`);

            console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keypair/id_rsa_pub.pem`)}`);
            console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keys/id_rsa_priv.pem`)}`);
        }

    }  else  {
        console.log(`${colors.bgCyan(`${colors.white("RSA KeyPair has not been installed.")}`)}`);
    }
}