import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  node_version: z.string().default("node:18"),
  alpine: z.boolean().default(true),
  alpinePackages: z
    .string()
    .default(
      "build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git"
    ),
  node_env: z.string().default("production"),
  build_packages: z.string().default("node-gyp"),
  production_packages: z.string().default("vips-dev"),
  user: z.string().default("node"),
  port: z.string().default("1337"),
});

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    ...files,
    Dockerfile: renderString(files["Dockerfile"], input),
  };
}
