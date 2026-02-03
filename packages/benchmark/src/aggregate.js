import fs from "node:fs";

const runs = [
    1,
    2,
    3,
    4,
    5,
].map((i) => JSON.parse(fs.readFileSync(`run_${i}.json`, "utf8")));
const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const min = (arr) => Math.min(...arr);
const max = (arr) => Math.max(...arr);

function stats(arr) {
    return {
        max: max(arr),
        mean: avg(arr),
        min: min(arr),
    };
}

const p50 = runs.map((r) => r.latency.p50);
const p90 = runs.map((r) => r.latency.p90);
const p95 = runs.map((r) => r.latency.p95);
const p97 = runs.map((r) => r.latency.p97_5); // autocannon Has this
const p99 = runs.map((r) => r.latency.p99);

const meanLatency = runs.map((r) => r.latency.average);
const minLatency = runs.map((r) => r.latency.min);
const maxLatency = runs.map((r) => r.latency.max);

const rps = runs.map((r) => r.requests.average);
const mbps = runs.map((r) => r.throughput.average / (1024 * 1024));

function row(_name, _s, _unit = "ms") {}

row("p50 latency", stats(p50));
row("p90 latency", stats(p90));
row("p95 latency", stats(p95));
row("p97.5 latency", stats(p97));
row("p99 latency", stats(p99));
row("Average latency", stats(meanLatency));
row("Minimum latency", stats(minLatency));
row("Maximum latency", stats(maxLatency));

row("Requests/sec", stats(rps), "");
row("Throughput (MB/s)", stats(mbps), "");
runs.forEach((_r, _i) => {});
