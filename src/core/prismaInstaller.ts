import fs from "fs";
import path from "path";
import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import {prismaProviderFunction} from "../functions/prismaProvider.function";

export async function prismaInstaller() {
    let ora = (await import("ora")).default;

    const installPrismaORM: symbol | string[] =  await clackCLI.select({
        message: "Do you want install Prisma ORM ?",
        initialValue: ["prisma_orm"],
        options: [
            {label: "Yes, i want to install Prisma ORM.", value: ["prisma_orm"]},
            {label: "No, i don't want it.", value: ['no_prisma_orm']},
        ],
    });

    if (clackCLI.isCancel(installPrismaORM)) {
        console.log(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
        process.exit(0);
    }

    if (installPrismaORM[0] === "prisma_orm") {
        const providerSelected: symbol | string[] =  await clackCLI.select({
            message: 'Please specify a provider that you want and prisma will be configure it, and create schema model',
            initialValue: ['mysql'],
            options: [
                {label: 'MySQL', value: ['mysql']},
                {label: 'Mongo DB', value: ['mongodb']},
                {label: 'Postgres', value: ['postgresql']},
            ],
        });
        if (clackCLI.isCancel(providerSelected)) {
            console.error(`${colors.bgRed(`${colors.white("Operation cancelled.")}`)}`);
            process.exit(0);
        }

        if (fs.existsSync(path.join(process.cwd()) + "/prisma/schema.prisma")) {
            console.error(`${colors.bgCyan(`${colors.white("Prisma has been already installed in your project.")}`)}`);
            process.exit(0);
        } else {
            try {
                const prismaORMSpinner = ora("Configuration of prisma schema...").start();
                if (providerSelected[0] === "mysql") {
                    await prismaProviderFunction("mysql", prismaORMSpinner);
                } else if (providerSelected[0] === "mongodb") {
                    await prismaProviderFunction("mongodb", prismaORMSpinner);
                } else {
                    await prismaProviderFunction("postgresql", prismaORMSpinner);
                }
            } catch (err: any) {
                console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                process.exit(0);
            }
        }
    } else {
        console.log(colors.bgCyan(`${colors.white(`You did not choose prisma as your ORM.`)}`));
        console.log(`${colors.cyan(`So you can choose any orm and setting up it in your project.`)}`);
    }
}