FROM mhart/alpine-node:8

WORKDIR /pm2

COPY . .

RUN npm install && \
    npm install -g pm2 && \
    chmod +x /pm2/init
    
CMD ["/bin/sh", "/pm2/init"]
    