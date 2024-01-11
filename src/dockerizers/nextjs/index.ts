import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  node_version: z.string(),
  alpine: z.boolean(),
  telemetry: z.boolean(),
  host: z.string(),
  port: z.string(),
  // advanced
  filePermissions_user: z.string(),
  filePermissions_group: z.string(),
  alpinePackages: z.string(),
});

export function generate(input: z.infer<typeof schema>): Files {
  return {
    ...files,
    Dockerfile: renderString(files["Dockerfile"], input),
  };
}
