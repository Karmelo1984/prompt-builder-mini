#!/usr/bin/env node

let input = "";
process.stdin.on("data", chunk => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input || "{}");
    const command = String(payload.tool_input?.command || "");

    const blocked = [
      { pattern: /\bnpm\s+install\b/, reason: "No instales dependencias. Usa las ya existentes." },
      { pattern: /\bpnpm\s+add\b/, reason: "No añadas dependencias externas." },
      { pattern: /\byarn\s+add\b/, reason: "No añadas dependencias externas." },
      { pattern: /\bbun\s+add\b/, reason: "No añadas dependencias externas." },
      { pattern: /\bnpx\s+create-/,
        reason: "No generes una app nueva ni migres de arquitectura." },
      { pattern: /\brm\s+-rf\b/, reason: "Comando destructivo bloqueado." },
      { pattern: /\bgit\s+clean\s+-fdx\b/, reason: "Limpieza destructiva bloqueada." },
      { pattern: /\bcurl\b.*\|\s*(sh|bash)/, reason: "No ejecutes scripts remotos." },
      { pattern: /\bwget\b.*\|\s*(sh|bash)/, reason: "No ejecutes scripts remotos." }
    ];

    const hit = blocked.find(rule => rule.pattern.test(command));
    if (hit) {
      console.error(`Blocked by project hook: ${hit.reason}`);
      process.exit(2);
    }

    process.exit(0);
  } catch (error) {
    console.error(`guard-bash failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(0);
  }
});