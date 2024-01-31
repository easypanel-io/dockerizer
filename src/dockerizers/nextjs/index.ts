import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  nodeImage: z.string().default("node:20"),
  telemetry: z.boolean().default(false),
  host: z.string().default("0.0.0.0"),
  port: z.string().default("3000"),
  // advanced
  user: z.string().default("nextjs"),
  group: z.string().default("nodejs"),
  alpinePackages: z.string().default("libc6-compat"),
});

export const nodeImageOptions = [
  "node:16",
  "node:16-alpine",
  "node:18",
  "node:18-alpine",
  "node:20",
  "node:20-alpine",
];

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
  };
}
