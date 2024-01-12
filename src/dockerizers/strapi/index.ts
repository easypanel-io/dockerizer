import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  nodeVersion: z.string().default("18"),
  buildStagePackages: z
    .string()
    .default(
      [
        "build-base",
        "gcc",
        "autoconf",
        "automake",
        "zlib-dev",
        "libpng-dev",
        "vips-dev",
        "git",
      ].join(" ")
    ),
  productionStagePackages: z.string().default("vips-dev"),
  user: z.string().default("node"),
  port: z.string().default("1337"),
});

export const nodeVersionOptions = ["16", "18", "20"];

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
  };
}
