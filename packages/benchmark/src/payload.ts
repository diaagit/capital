import http from "k6/http";
import { Trend } from "k6/metrics";
import { BASE_URL } from "./config.js";

export const payload_size = new Trend("payload_size", false); // number, not time

export default function () {
    const res = http.get(BASE_URL);

    const size = res.body
        ? typeof res.body === "string"
            ? res.body.length
            : res.body.byteLength
        : 0;

    payload_size.add(size);
}
