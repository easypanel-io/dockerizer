import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  php_version: z.string().default("7.4-apache"),
  packages: z
    .string()
    .default(
      "libzip-dev unzip libpng-dev libjpeg-dev libonig-dev libxml2-dev curl"
    ),
  php_extensions: z.string().default("pdo_mysql zip exif pcntl bcmath gd"),
  port: z.number().default(80),
});

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);

  return {
    ...files,
    Dockerfile: renderString(files["Dockerfile"], input),
  };
}
