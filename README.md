# pm2-signal-example
A pm2-docker example showing signal handling

## Install
```bash
$ git clone https://github.com/shaunwarman/pm2-signal-example.git
```

## Build and Run
```
$ cd pm2-signal-example
$ docker build -t pm2 .
$ docker run -itd --name pm2 pm2:latest
$ docker kill --signal SIGTERM pm2
```

## Logs
```
$ docker logs -f pm2
```

## Send signal from host (could be agent)
```
$ docker kill --signal SIGTERM pm2
```

## What's happening?
We trigger the SIGTERM from the host with `docker kill --signal SIGTERM pm2`.
The `SIGTERM` is trapped by `init` script and we can trigger `pm2-docker stop all` which will gracefully shutdown the worker
processes by sending a `SIGINT` to the workers. The workers (node app) can catch the SIGINIT and gracefully shutdown. Once all workers have exited then the `pm2 stop all` has finished.
