import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  node_version: z.string(),
  alpine: z.boolean(),
  alpinePackages: z.string(),
  node_env: z.string(),
  build_packages: z.string(),
  production_packages: z.string(),
  user: z.string(),
  port: z.string(),
});

export function generate(input: z.infer<typeof schema>): Files {
  return {
    ...files,
    Dockerfile: renderString(files["Dockerfile"], input),
  };
}
