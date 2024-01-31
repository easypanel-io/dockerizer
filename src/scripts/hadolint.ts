import { spawnSync } from "child_process";
import { readFileSync } from "fs";
import { globSync } from "glob";

async function run() {
  const dockerfiles = globSync("src/**/Dockerfile");

  for (const dockerfile of dockerfiles) {
    console.log("Linting", dockerfile);

    const process = spawnSync(
      "docker",
      ["run", "--rm", "-i", "hadolint/hadolint"],
      {
        stdio: "pipe",
        encoding: "utf-8",
        input: readFileSync(dockerfile, "utf-8"),
      }
    );

    const output = process.output.join("\n").trim();

    if (output.length > 0) {
      console.log(output);
      return;
    }

    console.log("=".repeat(80));
  }
}

run().catch((e) => console.log(e));
