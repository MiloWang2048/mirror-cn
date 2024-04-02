import { checkDocker, readTargets } from "./utils.js";
import { exec } from "node:child_process";
import { logger } from "./utils.js";

async function push() {
  await checkDocker();
  for (const target of readTargets()) {
    const pushCommand = `docker push --all-tags mirrorcn/${target.repoName}`;
    logger.info(`Pushing ${target.repoName}...`);
    logger.debug("Push command:", pushCommand);
    await new Promise((resolve) => {
      exec(
        pushCommand,
        {
          windowsHide: true,
        },
        (error) => {
          if (error) {
            logger.error(`Error when pushing ${target.repoName}. Abort.`);
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

push();
