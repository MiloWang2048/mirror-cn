import { buildImages } from "./build-images.js";
import { checkDocker, readTargets } from "./utils.js";

async function build() {
  await checkDocker();
  for (const target of readTargets()) {
    await buildImages(target);
  }
}

build();
