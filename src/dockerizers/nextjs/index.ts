import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  node_version: z.string().default("node:18"),
  alpine: z.boolean().default(true),
  telemetry: z.boolean().default(false),
  host: z.string().default("0.0.0.0"),
  port: z.string().default("3000"),
  // advanced
  filePermissions_user: z.string().default("nextjs"),
  filePermissions_group: z.string().default("nodejs"),
  alpinePackages: z.string().default("libc6-compat"),
});

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
  };
}
