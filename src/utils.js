import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { targetSchema } from "./target-schema.js";
import log4js from "log4js";
import yaml from "yaml";
import { exec } from "node:child_process";

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

export const logger = log4js.getLogger();
logger.level = "INFO";

// 检查 docker 是否安装并良好运行
export function checkDocker() {
  return new Promise((resolve) => {
    exec(
      "docker info",
      {
        windowsHide: true,
      },
      (error) => {
        if (error) {
          logger.error(
            "Docker not installed or docker deamon not running. Abort."
          );
          logger.error(error.message);
          process.exit(-1);
        }
        resolve();
      }
    );
  });
}
