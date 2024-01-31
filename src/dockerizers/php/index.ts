import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import path from "path";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  phpVersion: z.string().default("8.2"),
  alpine: z.boolean().default(true),
  documentRoot: z.string().default("/"),
  webServer: z.string().default("nginx"),
  composerInstall: z.boolean().default(false),

  phpDateTimezone: z.string().default("UTC"),
  phpDisplayErrors: z.string().default("Off"),
  phpMemoryLimit: z.string().default("128M"),
  phpMaxExecutionTime: z.number().default(60),
  phpPostMaxSize: z.string().default("32M"),
  phpUploadMaxFilesize: z.string().default("16M"),
});

export const webServerOptions = ["apache", "nginx"];

export const phpVersionOptions = ["7.2", "7.3", "7.4", "8.0", "8.1", "8.2"];

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  input.documentRoot = path.join("/app", input.documentRoot);

  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
    "vhost.conf":
      input.webServer === "nginx"
        ? renderString(files["nginx-vhost.conf.njk"], input)
        : renderString(files["apache-vhost.conf.njk"], input),
    "php.ini": renderString(files["php.ini.njk"], input),
  };
}
