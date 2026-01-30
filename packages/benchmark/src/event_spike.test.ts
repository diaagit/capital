import { check } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";
import { BASE_URL, QUERY, THRESHOLDS } from "./config.js";

export const eventLatency = new Trend("event_list_latency", true);

export const options = {
    scenarios: {
        spike: {
            executor: "per-vu-iterations",
            iterations: 1,
            maxDuration: "5m",
            vus: 5000,
        },
    },
    thresholds: THRESHOLDS,
};

export default function () {
    const res = http.get(`${BASE_URL}${QUERY}`);

    check(res, {
        "200 OK": (r) => r.status === 200,
    });

    eventLatency.add(res.timings.duration);
}
