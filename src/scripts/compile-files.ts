import { readFile, writeFile } from "fs/promises";
import { globSync } from "glob";

async function run() {
  const dockerizers = globSync("src/dockerizers/*/files").map(
    (item) => item.split("/")[2]
  );

  console.log(dockerizers);

  for (const dockerizer of dockerizers) {
    const files = globSync(`src/dockerizers/${dockerizer}/files/**`, {
      nodir: true,
    });
    console.log(files);

    const output: Record<string, string> = {};
    for (const file of files) {
      const content = await readFile(file, "utf-8");

      const key = file.split("/").splice(4).join("/");
      console.log(key);
      output[key] = content;
    }

    await writeFile(
      `src/dockerizers/${dockerizer}/files.json`,
      JSON.stringify(output, null, 2),
      "utf-8"
    );
  }
}

run().catch((e) => console.log(e));
