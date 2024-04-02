import { readTargets } from "./utils.js";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

async function main() {
  const readmePath = fileURLToPath(import.meta.resolve("../README.md"));
  const readmeFile = String(fs.readFileSync(readmePath)).split("\n");
  const beginIndex = readmeFile.findIndex((val) =>
    new RegExp("<!-- Generated content begin -->").test(val)
  );
  const endIndex = readmeFile.findIndex((val) =>
    new RegExp("<!-- Generated content end -->").test(val)
  );
  const changes = [];
  for (const target of readTargets()) {
    const tagsStr = target.tags.join(", ");
    const str = `- \`${target.repoName}\`:
  \`\`\`
  ${tagsStr}
  \`\`\``;
    changes.push(...str.split("\n"));
  }
  readmeFile.splice(beginIndex + 1, endIndex - beginIndex - 1, ...changes);
  fs.writeFileSync(readmePath, readmeFile.join("\n"));
}
main();
