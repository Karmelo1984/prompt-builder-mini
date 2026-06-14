#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const marker = path.join(projectDir, ".claude", "state", "build-required");
const packageJsonPath = path.join(projectDir, "package.json");

if (!fs.existsSync(marker)) {
  process.exit(0);
}

if (!fs.existsSync(packageJsonPath)) {
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const scripts = pkg.scripts || {};

const commands = [];

if (scripts.build) {
  commands.push(["npm", ["run", "build"]]);
}

if (scripts.lint) {
  commands.push(["npm", ["run", "lint"]]);
}

if (scripts.test) {
  commands.push(["npm", ["run", "test"]]);
}

for (const [cmd, args] of commands) {
  const result = spawnSync(cmd, args, {
    cwd: projectDir,
    stdio: "pipe",
    encoding: "utf8"
  });

  if (result.status !== 0) {
    console.error(
      [
        `Blocked by project hook: ${cmd} ${args.join(" ")} failed.`,
        "",
        "STDOUT:",
        result.stdout || "<empty>",
        "",
        "STDERR:",
        result.stderr || "<empty>",
        "",
        "Fix the failure before finishing the issue."
      ].join("\n")
    );
    process.exit(2);
  }
}

fs.rmSync(marker, { force: true });
process.exit(0);