FROM debian:12-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    chromium \
    xvfb \
    fluxbox \
    x11vnc \
    novnc \
    websockify \
    wget \
    supervisor \
    && apt-get clean

WORKDIR /app

COPY package.json .
RUN npm install

COPY server.js .
COPY start.sh .

RUN chmod +x start.sh

RUN mkdir -p /data/browser

EXPOSE 8080

CMD ["./start.sh"]
