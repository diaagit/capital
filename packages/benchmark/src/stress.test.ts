import { check, sleep } from "k6";
import http from "k6/http";
import { Rate, Trend } from "k6/metrics";
import { BASE_URL } from "./config.js";

export const eventLatency = new Trend("event_latency_ms", true);
export const successRate = new Rate("success_rate");

export const options = {
    discardResponseBodies: true, // realistic production mode

    scenarios: {
        stress: {
            executor: "ramping-vus",

            gracefulRampDown: "30s",

            stages: [
                {
                    duration: "30s",
                    target: 100,
                },
                {
                    duration: "30s",
                    target: 300,
                },
                {
                    duration: "30s",
                    target: 500,
                },
                {
                    duration: "30s",
                    target: 800,
                },
                {
                    duration: "30s",
                    target: 1200,
                },
                {
                    duration: "30s",
                    target: 1600,
                },
                {
                    duration: "30s",
                    target: 2000,
                },
                {
                    duration: "30s",
                    target: 5000,
                },
            ],
            startVUs: 10, // gradual start (important)
        },
    },

    thresholds: {
        http_req_duration: [
            "p(50)<400",
            "p(95)<800",
            "p(99)<1000",
        ],
        http_req_failed: [
            "rate<0.01",
        ],
        success_rate: [
            "rate>0.99",
        ],
    },
};

export default function () {
    const res = http.get(BASE_URL);

    const ok = res.status === 200;

    successRate.add(ok);

    check(res, {
        "200 OK": () => ok,
    });

    eventLatency.add(res.timings.duration);

    sleep(1);
}
