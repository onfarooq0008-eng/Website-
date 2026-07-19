#!/bin/bash

export DISPLAY=:0

Xvfb :0 -screen 0 1280x900x24 &

sleep 2

fluxbox &

sleep 2

x11vnc \
-display :0 \
-rfbport 5900 \
-forever \
-shared \
-bg

sleep 2

websockify \
--web=/usr/share/novnc/ \
8081 \
localhost:5900 &


npm start
