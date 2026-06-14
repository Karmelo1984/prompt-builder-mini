#!/usr/bin/env node

import path from "node:path";

let input = "";
process.stdin.on("data", chunk => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input || "{}");
    const filePath = String(payload.tool_input?.file_path || "");
    const normalized = filePath.split(path.sep).join("/");

    const forbidden = [
      "/node_modules/",
      "/dist/",
      "/build/",
      "/coverage/",
      ".env",
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
      "bun.lockb"
    ];

    const hit = forbidden.find(part => normalized.includes(part) || normalized.endsWith(part));
    if (hit) {
      console.error(`Blocked by project hook: no escribas en ${hit}.`);
      process.exit(2);
    }

    process.exit(0);
  } catch (error) {
    console.error(`guard-write failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(0);
  }
});