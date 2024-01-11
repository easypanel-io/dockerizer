import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  php_version: z.string(),
  packages: z.string(),
  php_extensions: z.string(),
  port: z.number(),
});

export function generate(input: z.infer<typeof schema>): Files {
  return {
    ...files,
    Dockerfile: renderString(files["Dockerfile"], input),
  };
}
