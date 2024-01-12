import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  phpVersion: z.string().default("8.3-apache"),
  packages: z
    .string()
    .default(
      [
        "libzip-dev",
        "unzip",
        "libpng-dev",
        "libjpeg-dev",
        "libonig-dev",
        "libxml2-dev",
        "curl",
      ].join(" ")
    ),
  phpExtensions: z
    .string()
    .default(["pdo_mysql", "zip", "exif", "pcntl", "bcmath", "gd"].join(" ")),
  port: z.number().default(80),
});

export const phpVersionOptions = ["5.3-apache", "7.4-apache", "8.3-apache"];

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);

  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
  };
}
