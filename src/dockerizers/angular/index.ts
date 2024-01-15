import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  projectName: z.string().default("myApp"),
  nodeImage: z.string().default("node:18-alpine"),
  nginxImage: z.string().default("nginx:stable"),
  port: z.string().default("80"),
});

export const nodeImageOptions = [
  "node:16",
  "node:16-alpine",
  "node:18",
  "node:18-alpine",
  "node:20",
  "node:20-alpine",
];

export const nginxImageOptions = ["nginx:stable", "nginx:latest"];

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
    "default.conf": files["default.conf"],
  };
}
