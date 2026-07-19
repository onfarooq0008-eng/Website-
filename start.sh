#!/bin/bash

pkill Xvfb || true
pkill x11vnc || true
pkill websockify || true


export DISPLAY=:0


Xvfb :0 -screen 0 1280x900x24 &

sleep 3


fluxbox &

sleep 3


x11vnc \
-display :0 \
-rfbport 5900 \
-forever \
-shared \
-noxdamage \
-bg


sleep 3


websockify \
--web=/usr/share/novnc \
8081 \
localhost:5900 &


sleep 5


npm start
