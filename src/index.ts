#!/usr/bin/env node

import { installerCore } from "@opticore-installer/core/installer.core";

const initialProjectName: string | undefined = process.argv[2];

(async(): Promise<void> => await installerCore(initialProjectName))();