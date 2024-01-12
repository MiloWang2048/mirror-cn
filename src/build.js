import { buildImages } from "./build-images.js";
import { checkDocker, clearImageCache, readTargets } from "./utils.js";

async function build() {
  await checkDocker();
  await clearImageCache();
  for (const target of readTargets()) {
    await buildImages(target);
  }
}

build();
