export const BASE_URL = "http://localhost:3001/api/v1/events";

export const QUERY =
    "?category=MUSIC&language=ENGLISH&sortBy=created_at&order=desc&page=1&limit=10";

export const THRESHOLDS = {
    event_list_latency: [
        "p(50)<200",
        "p(95)<800",
        "p(99)<1000",
    ],
    http_req_failed: [
        "rate<0.01",
    ],
};
