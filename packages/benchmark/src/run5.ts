import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const k6Script = path.resolve(__dirname, "./spike.test.js");

const RUNS = 1;
const resultsDir = path.resolve(process.cwd(), "results");

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
}

for (let i = 1; i <= RUNS; i++) {
    const outFile = path.join(resultsDir, `spike-${5}.json`);

    try {
        execSync(`k6 run "${k6Script}" --summary-export="${outFile}"`, {
            stdio: "inherit",
        });
    } catch (_err) {}
}
