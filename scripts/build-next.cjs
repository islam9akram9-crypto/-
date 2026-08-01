/* eslint-disable @typescript-eslint/no-require-imports */

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const wasmDir = path.join(process.cwd(), "node_modules", "@next", "swc-wasm-nodejs");
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const result = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_TEST_WASM: "1",
    NEXT_TEST_WASM_DIR: wasmDir,
  },
});

process.exit(result.status ?? 1);
