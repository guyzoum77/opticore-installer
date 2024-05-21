import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import fs from "fs";

export default async function askInstallingRSAKeypairUtils(projectPath: any) {
    let ora = (await import("ora")).default;
    const asymmetricRSAKeypair =  await clackCLI.select({
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
        const rsaSpinner = ora("Installing asymmetric RSA Keypair\n").start();
        (await import("opticore-asymmetric-rsa-keypair"));
        rsaSpinner.succeed();
    }
}