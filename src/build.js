import { buildImages } from "./build-images.js";
import { execSync } from "node:child_process";
import { readTargets } from "./utils.js";

// 检查 docker 是否安装并良好运行
try {
  execSync("docker info", { windowsHide: true, stdio: "ignore" });
} catch (err) {
  console.log("Docker not installed or docker deamon not running. Abort.");
  process.exit(-1);
}

// 清空镜像缓存
try {
  execSync("docker system prune -a --force", {
    windowsHide: true,
    stdio: "ignore",
  });
} catch (err) {
  console.log("Error when pruning image cache. Abort.");
  process.exit(-1);
}

readTargets().forEach(buildImages);
