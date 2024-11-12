import crypto, {KeyPairSyncResult} from "crypto";
import colors from "ansi-colors";
import {rsaKeyPairOptionsFunction} from "./rsaKeyPairOptions.function";
import fs from "fs";
import path from "path";
import {promptConfirmActionFunction} from "./promptConfirmAction.function";
import {createFileFunction} from "./createFile.function";


export async function rsaKeysInstallerFunction() {
    try {
        let keyPairDir: string = process.cwd() + "/src/utils/constants/keypair";
        let keyPair: KeyPairSyncResult<string, string> = crypto.generateKeyPairSync(
            "rsa",
            rsaKeyPairOptionsFunction()
        );

        const askQuestion: boolean | symbol = await promptConfirmActionFunction();
        if(askQuestion) {
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

                const keysPath: string = process.cwd() + "/src/utils/constants/keys";
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

                console.log(`${colors.bgGreen(`${colors.white(`The RSA Keypair is been created successfully.`)}`)}`);
                console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keypair/public.key.ts`)}`);
                console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keypair/private.key.ts`)}`);

                console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keypair/id_rsa_pub.pem`)}`);
                console.log(`${colors.cyan(`created`)} : ${colors.green(`src/core/constants/keys/id_rsa_priv.pem`)}`);
            }
        } else  {
            console.log(`${colors.bgCyan(`${colors.white("RSA KeyPair has not been installed.")}`)}`);
            process.exit(0);
        }
    } catch (err: any) {
        console.log(`${colors.red(`${colors.white(`${err.message}`)}`)}`);
        return err;
    }
}