// eslint-disable-next-line no-unused-vars
const { isMainThread, parentPort, workerData } = require('node:worker_threads');
const someWorkDone = (ms) =>{
  setTimeout(() => {
    console.log('[WORKER] SomeWorkDone in ' + ms + ' ms. Workload: \n' + workerData.workload);
    parentPort.postMessage({ message: `Worker finished task in ${ms}. Workload:"${workerData.workload}" is processed` });
    }, ms);
};

const getRandomInt = (max, min = 0.5) => {
  return  Math.floor(Math.random() * (max - min) * 1000) + min;
};

// if (isMainThread) {
//   const threadCount = +process.argv[2] || 2;
//   const threads = new Set();
// }
// else{
  someWorkDone(getRandomInt(3));
// }