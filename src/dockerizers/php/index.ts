import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import path from "path";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  phpImage: z.string().default("webdevops/php-apache:8.2-alpine"),
  documentRoot: z.string().default("/"),
  phpUnixSocket: z.boolean().default(true),
  phpUnixSocketValue: z.string().default("/var/run/php-fpm.sock"),
  webServer: z.string().default("apache"),
  runComposerInstall: z.boolean().default(true),

  phpDateTimezone: z.string().default("Europe/Bucharest"),
  phpDisplayErrors: z.string().default("Off"),
  phpMemoryLimit: z.string().default("128M"),
  phpMaxExecutionTime: z.number().default(60),
  phpPostMaxSize: z.string().default("32M"),
  phpUploadMaxFilesize: z.string().default("16M"),
});

export const webServerOptions = ["apache", "nginx"];

export const phpImageOptions = [
  "webdevops/php-apache:7.2-alpine",
  "webdevops/php-apache:7.3-alpine",
  "webdevops/php-apache:7.4-alpine",
  "webdevops/php-apache:8.0-alpine",
  "webdevops/php-apache:8.1-alpine",
  "webdevops/php-apache:8.2-alpine",
];

export const phpUnixSocketValueOptions = [
  "127.0.0.1:9000",
  "/var/run/php-fpm.sock",
];

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
