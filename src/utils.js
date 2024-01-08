import path from "node:path";
import { fileURLToPath } from "node:url";
import { targetSchema } from "./target-schema.js";
import { getLogger } from "log4js";

export const targetDirPath = fileURLToPath(import.meta.resolve("../target"));
export const targetPaths = fs
  .readdirSync(targetDirPath)
  .map((targetFileName) => path.resolve(targetDirPath, targetFileName));

export function readTargets() {
  return targetPaths.map((targetPath) => {
    const target = yaml.parse(String(fs.readFileSync(targetPath)));
    const { error } = targetSchema.validate(target);
    if (error) {
      throw error;
    }
    return target;
  });
}

export const logger = getLogger();
logger.level = "INFO";
