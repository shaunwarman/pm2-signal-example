const Express = require('express');
const OS = require('os');

const app = Express();

function hostInfo() {
  return `hostname: ${OS.hostname()} - PID: ${process.pid}`;
}

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(8000, () => {
  console.log('Listening on 8000');
  process.send('ready');
});

process.on('SIGINT', () => {
  let num = 0;
  console.log(`SIGINT trapped - ${hostInfo()}`);
  const interval = setInterval(() => {
    console.log(`interval ${num} - ${hostInfo()}`);
    num++;
  }, 1000);
  interval.unref();
  
  setTimeout(() => {
    console.log(`exit - ${hostInfo()}`);
    process.exit(1);
  }, 10000);
});