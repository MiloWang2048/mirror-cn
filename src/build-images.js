import { execSync } from "node:child_process";
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

export function buildImages(target) {
  target.tags.forEach((tag) => {
    const dockerfile = buildDockerfile(target.repoName, tag, target.commands);
    const tmpFilePath = fileURLToPath(
      import.meta.resolve("../build/dockerfile")
    );
    const buildPath = path.dirname(tmpFilePath);
    fs.mkdirSync(buildPath, { recursive: true });
    fs.writeFileSync(tmpFilePath, dockerfile);
    const buildCommand = `docker build -t mirrorcn/${target.repoName}:${tag} -q .`;
    try {
      logger.info(`Building ${target.repoName}:${tag}...`);
      execSync(buildCommand, {
        windowsHide: true,
        cwd: buildPath,
        stdio: "ignore",
      });
      logger.info("Success.");
    } catch (error) {
      logger.error(`Error when building ${target.repoName}:${tag}. Abort.`);
      process.exit(-1);
    }
  });
}
