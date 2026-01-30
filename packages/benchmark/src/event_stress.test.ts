import { check } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";
import { BASE_URL, THRESHOLDS } from "./config.js";

export const eventLatency = new Trend("event_list_latency", true);

export const options = {
    scenarios: {
        stress: {
            executor: "ramping-vus",
            gracefulRampDown: "30s",
            stages: [
                {
                    duration: "20s",
                    target: 100,
                },
                {
                    duration: "20s",
                    target: 100,
                },
                {
                    duration: "20s",
                    target: 200,
                },
                {
                    duration: "20s",
                    target: 200,
                },
                {
                    duration: "20s",
                    target: 300,
                },
                {
                    duration: "20s",
                    target: 300,
                },
                {
                    duration: "20s",
                    target: 500,
                },
                {
                    duration: "20s",
                    target: 500,
                },
                {
                    duration: "20s",
                    target: 800,
                },
                {
                    duration: "20s",
                    target: 800,
                },
                {
                    duration: "20s",
                    target: 1000,
                },
                {
                    duration: "20s",
                    target: 2000,
                },
                {
                    duration: "20s",
                    target: 5000,
                },
                //{ duration: "20s", target: 10000 },
            ],
            startVUs: 500,
        },
    },
    thresholds: THRESHOLDS,
};

export default function () {
    const res = http.get(`${BASE_URL}`);

    check(res, {
        "200 OK": (r) => r.status === 200,
    });

    eventLatency.add(res.timings.duration);
}
