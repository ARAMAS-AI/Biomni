#!/bin/bash
# Quick start script for Biomni FastAPI server

echo "Starting Biomni FastAPI Server..."
echo "================================"
echo ""

# Check if requirements are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "Installing requirements..."
    pip install -r requirements.txt
fi

# Start the server
echo "Starting server on http://localhost:8000"
echo "API documentation available at http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
