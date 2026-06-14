#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

let input = "";
process.stdin.on("data", chunk => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input || "{}");
    const filePath = String(payload.tool_input?.file_path || "");

    const relevant =
      filePath.includes("/src/") ||
      filePath.endsWith("index.html") ||
      filePath.endsWith("styles.css") ||
      filePath.endsWith("package.json") ||
      filePath.endsWith("tsconfig.json") ||
      filePath.endsWith("vite.config.ts");

    if (!relevant) {
      process.exit(0);
    }

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const stateDir = path.join(projectDir, ".claude", "state");
    fs.mkdirSync(stateDir, { recursive: true });
    fs.writeFileSync(path.join(stateDir, "build-required"), new Date().toISOString());

    process.exit(0);
  } catch {
    process.exit(0);
  }
});