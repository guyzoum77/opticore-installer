import fs from "fs";

export type TRemovePath = (path: fs.PathLike, options?: (fs.RmOptions | undefined)) => Promise<void>