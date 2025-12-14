#!/bin/bash

# Script to start all SSO systems

echo "Starting SSO Architecture..."

# Start SSO Server
echo "Starting SSO Server on port 3001..."
cd sso-server
npm run dev > sso-server.log 2>&1 &
SSO_SERVER_PID=$!
cd ..

# Start Login System
echo "Starting Login System on port 3002..."
cd login-system
npm run dev > login-system.log 2>&1 &
LOGIN_SYSTEM_PID=$!
cd ..

# Start System A
echo "Starting System A on port 3000..."
cd system-a
npm run dev > system-a.log 2>&1 &
SYSTEM_A_PID=$!
cd ..

# Start System B
echo "Starting System B on port 3003..."
cd system-b
npm run dev > system-b.log 2>&1 &
SYSTEM_B_PID=$!
cd ..

echo "All systems started!"
echo "SSO Server PID: $SSO_SERVER_PID"
echo "Login System PID: $LOGIN_SYSTEM_PID"
echo "System A PID: $SYSTEM_A_PID"
echo "System B PID: $SYSTEM_B_PID"

echo ""
echo "Access the systems at:"
echo "- System A: http://localhost:3000"
echo "- System B: http://localhost:3003"
echo "- Login System: http://localhost:3002"
echo "- SSO Server: http://localhost:3001"

echo ""
echo "Press Ctrl+C to stop all systems"

# Wait for all background processes
wait $SSO_SERVER_PID $LOGIN_SYSTEM_PID $SYSTEM_A_PID $SYSTEM_B_PID