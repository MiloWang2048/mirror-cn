import { readTargets } from "./utils.js";
import { execSync } from "node:child_process";
import { logger } from "./utils.js";

readTargets().forEach((target) => {
  try {
    execSync(`docker push -aq mirrorcn/${target.repoName}`, {
      windowsHide: true,
      stdio: "ignore",
    });
  } catch (err) {
    logger.error(`Error when pushing repo ${repoName}. Abort.`);
    process.exit(-1);
  }
});
