import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "./utils.js";

function buildDockerfile(repoName, tag, commands) {
  return `
  FROM ${repoName}:${tag}
  ${commands.map((command) => `RUN ${command}`).join("\n")}
`;
}

export async function buildImages(target) {
  for (const tag of target.tags) {
    const dockerfile = buildDockerfile(target.repoName, tag, target.commands);
    const tmpFilePath = fileURLToPath(
      import.meta.resolve("../build/dockerfile")
    );
    const buildPath = path.dirname(tmpFilePath);
    fs.mkdirSync(buildPath, { recursive: true });
    fs.writeFileSync(tmpFilePath, dockerfile);
    await new Promise((resolve) => {
      const pullCommand = `docker pull ${target.repoName}:${tag}`;
      logger.info(`Pulling ${target.repoName}:${tag}...`);
      logger.debug("Pull command:", pullCommand);
      exec(
        pullCommand,
        {
          windowsHide: true,
        },
        (error) => {
          if (error) {
            logger.error(
              `Error when pulling ${target.repoName}:${tag}. Abort.`
            );
            logger.error(error.message);
            process.exit(-1);
          }
          resolve();
        }
      );
    });
    await new Promise((resolve) => {
      const buildCommand = `docker build -t mirrorcn/${target.repoName}:${tag} .`;
      logger.info(`Building ${target.repoName}:${tag}...`);
      logger.debug("Build command:", buildCommand);
      exec(
        buildCommand,
        {
          windowsHide: true,
          cwd: buildPath,
        },
        (error) => {
          if (error) {
            logger.error(
              `Error when building ${target.repoName}:${tag}. Abort.`
            );
            logger.error(error.message);
            process.exit(-1);
          }
          logger.info("Success.");
          resolve();
        }
      );
    });
  }
}
