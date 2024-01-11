import { basename, extname } from "path";

export function detectLanguage(path: string) {
  const name = basename(path, ".njk").toLowerCase();

  if (name === "dockerfile") return "dockerfile";
  return extname(name);
}
