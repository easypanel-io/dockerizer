import { mkdir, readFile, rm, writeFile } from "fs/promises";
import { globSync } from "glob";
import { dirname } from "path";

async function run() {
  const inputFiles = globSync("src/dockerizers/*/tests/*/input.json");

  for (const inputFile of inputFiles) {
    const dockerizer = inputFile.split("/")[2];
    const test = inputFile.split("/")[4];

    const generate = require(`../dockerizers/${dockerizer}`).generate;
    const input = JSON.parse(await readFile(inputFile, "utf-8"));

    const codePath = inputFile.split("/").slice(0, 5).join("/") + "/code";

    await rm(`${codePath}/dockerizer`, {
      force: true,
      recursive: true,
    });

    const files = generate(input);
    for (const file of Object.keys(files)) {
      const filePath = `${codePath}/dockerizer/${file}`;

      await mkdir(dirname(filePath), { recursive: true });

      await writeFile(filePath, files[file], "utf-8");
    }
  }
}

run().catch((e) => console.log(e));
