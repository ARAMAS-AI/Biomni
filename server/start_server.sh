#!/bin/bash
# Quick start script for Biomni FastAPI server

# Set a default LLM model
DEFAULT_LLM="gpt-4.1"

# Use the first command-line argument ($1) as the LLM model.
# If $1 is not provided or is empty, use the DEFAULT_LLM.
# The ${1:-...} syntax is a standard bash parameter expansion.
LLM_MODEL="${1:-$DEFAULT_LLM}"

echo "Starting Biomni FastAPI Server..."
echo "================================"
echo "Using default LLM: $LLM_MODEL"
echo ""

# Check if requirements are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "Installing requirements..."
    pip install -r requirements.txt
fi

# Export the chosen LLM as an environment variable
# The Python app (main.py) will read this variable on startup.
export BIOMNI_LLM="$LLM_MODEL"

# Start the server
echo "Starting server on http://localhost:8000"
echo "API documentation available at http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --host 127.0.0.1 --port 8000 --reload