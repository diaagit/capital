import type { NextFunction, Request, Response } from "express";
import { activeRequestsGauge, httpRequestDurationMs, requestCount } from "./metrics/requestCount";

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Skip metrics for /metrics endpoint
    if (req.route?.path === "/metrics") {
        return next();
    }

    const startTime = Date.now();
    activeRequestsGauge.inc();

    const endRequest = () => {
        const duration = Date.now() - startTime;

        const params =
            req.params && Object.keys(req.params).length ? JSON.stringify(req.params) : "{}";
        const query = req.query && Object.keys(req.query).length ? JSON.stringify(req.query) : "{}";

        const routeLabel = req.route?.path || req.path;

        requestCount.inc({
            method: req.method,
            params,
            query,
            route: routeLabel,
            status_code: res.statusCode,
        });

        httpRequestDurationMs.observe(
            {
                method: req.method,
                params,
                query,
                route: routeLabel,
                status_code: res.statusCode,
            },
            duration,
        );

        activeRequestsGauge.dec();
    };

    res.on("finish", endRequest);
    res.on("close", endRequest);

    next();
};
