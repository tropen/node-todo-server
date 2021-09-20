const { Worker } = require('node:worker_threads');

/** For faster test
curl  http://localhost:5000/api/v1/worker -H"authentication:lucky"
 */
exports.start = async (req, res) => {
  //todo make pool of workers (cluster).
  const worker = new Worker("./workers/worker.js", { workerData: { workload: 'Some workload' } });

  worker.on("error", error => {
    console.log(error);
  });

  worker.on("exit", exitCode => {
    if (exitCode !== 0) {
      console.error('Worker exit code: ' + exitCode);
    }
  });

  worker.once("message", result => {
    //some delayed
    res.send('start thread? ' + result.message);
  });
};
