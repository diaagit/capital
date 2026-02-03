import { check, sleep } from "k6";
import http from "k6/http";
import { Rate, Trend } from "k6/metrics";
import { BASE_URL } from "./config.js";

export const eventLatency = new Trend("event_list_latency", true);
export const successRate = new Rate("success_rate");

export const options = {
    scenarios: {
        spike: {
            duration: "60s", // sustain spike for 1 min
            executor: "constant-vus",
            gracefulStop: "10s",
            vus: 2800, // instant spike Depends on UR Machine
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
    const res = http.get(`${BASE_URL}`);

    const ok = res.status === 200;

    successRate.add(ok);

    check(res, {
        "200 OK": () => ok,
    });

    eventLatency.add(res.timings.duration);

    sleep(1);
}
