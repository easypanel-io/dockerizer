import { Files } from "@/lib/types";
import { renderString } from "nunjucks";
import { z } from "zod";
import files from "./files.json";

export const schema = z.object({
  key: z.string().default("value"),
});

export const defaultValues = schema.parse({});

export function generate(rawInput: z.infer<typeof schema>): Files {
  const input = schema.parse(rawInput);
  return {
    Dockerfile: renderString(files["Dockerfile.njk"], input),
  };
}
