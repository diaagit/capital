import cluster from "node:cluster";
import os from "node:os";
import { app, port } from "./app";

const totalCpus = os.cpus().length;

// NOTE: Ask Ronak Each time you touch this code

if (cluster.isPrimary) {
    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", (_worker, _code, _signal) => {
        cluster.fork();
    });
} else {
    app.listen(port, () => {});
}
