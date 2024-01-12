import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  node_image: z.string().default("node:18-alpine"),
  nginx_image: z.string().default("nginx:stable"),
  port: z.string().default("80"),
});

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
  };
}
