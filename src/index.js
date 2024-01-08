import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "yaml";
import { targetSchema } from "./target-schema.js";
import { buildImages } from "./build-images.js";
import { execSync } from "node:child_process";

try {
  execSync("docker info", { windowsHide: true, stdio: "ignore" });
} catch (err) {
  console.log("Docker not installed or docker deamon not running. Abort.");
  process.exit(-1);
}

const targetDirPath = fileURLToPath(import.meta.resolve("../target"));
const targetPaths = fs
  .readdirSync(targetDirPath)
  .map((targetFileName) => path.resolve(targetDirPath, targetFileName));

targetPaths.forEach((targetPath) => {
  const target = yaml.parse(String(fs.readFileSync(targetPath)));
  const { error } = targetSchema.validate(target);
  if (error) {
    console.log("Invalid target at", targetPath);
    console.log(error.message);
  }
  buildImages(target);
});
