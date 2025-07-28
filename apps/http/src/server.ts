import cluster from "cluster";
import os from "os";
import { app, port } from "./app"; 

const totalCpus = os.cpus().length;

// NOTE: Ask Ronak Each time you touch this code

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCpus}`);
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Forking a new worker...");
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} is running`);
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/ (PID: ${process.pid})`);
  });
}
