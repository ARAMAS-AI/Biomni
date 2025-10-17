"""
FastAPI server for Biomni agent with streaming support.

This server provides a REST API to interact with the Biomni agent,
allowing configuration of LLM parameters and streaming of agent execution steps.
"""

import os
from contextlib import asynccontextmanager
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from biomni.agent import A1
from biomni.config import BiomniConfig, default_config

# Load environment variables
if os.path.exists(".env"):
    load_dotenv(".env")

# Global agent instance (initialized on startup)
agent: Optional[A1] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize the agent on startup."""
    global agent
    print("Initializing Biomni agent...")
    # Initialize with default config on startup
    default_config.path = '/Users/balaji/Biomni/data'
    agent = A1(path="/Users/balaji/Biomni/data")
    print("Biomni agent initialized successfully")
    yield
    # Cleanup if needed
    print("Shutting down Biomni server...")


app = FastAPI(
    title="Biomni Agent API",
    description="API for running Biomni agent with configurable LLM parameters and streaming support",
    version="1.0.0",
    lifespan=lifespan,
)

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AgentRequest(BaseModel):
    """Request model for agent execution."""

    query: str = Field(..., description="The biomedical query to process")
    llm: Optional[str] = Field(
        None, description="LLM model to use (e.g., 'gpt-4.1-mini', 'claude-sonnet-4-5')"
    )
    temperature: Optional[float] = Field(None, ge=0.0, le=2.0, description="Temperature for LLM sampling")
    timeout_seconds: Optional[int] = Field(None, gt=0, description="Timeout for code execution in seconds")
    use_tool_retriever: Optional[bool] = Field(None, description="Whether to use tool retriever")
    commercial_mode: Optional[bool] = Field(None, description="Whether to use commercial mode (licensed datasets only)")
    data_path: Optional[str] = Field(None, description="Path to data directory")


class StepResponse(BaseModel):
    """Response model for a single step."""

    output: str = Field(..., description="The output text for this step")


class HealthResponse(BaseModel):
    """Response model for health check."""

    status: str
    message: str


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint with API information."""
    return {
        "status": "healthy",
        "message": "Biomni Agent API is running. Visit /docs for API documentation.",
    }


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "message": "Biomni agent is ready",
    }


async def step_generator(query: str, config: dict):
    """
    Generator function that yields steps from the agent execution.

    Args:
        query: The biomedical query to process
        config: Configuration dictionary for the agent
    """
    try:
        # Create a new agent instance with the provided configuration
        # Filter out None values from config
        agent_config = {k: v for k, v in config.items() if v is not None}

        # Create agent with custom configuration
        custom_agent = A1(**agent_config)

        # Stream the agent execution
        for step in custom_agent.go_stream(query):
            # Yield each step as a formatted string for SSE
            # Format: data: {json}\n\n
            import json

            yield f"data: {json.dumps(step)}\n\n"

        # Send a final message to indicate completion
        yield f"data: {json.dumps({'output': '[DONE]', 'status': 'completed'})}\n\n"

    except Exception as e:
        # Send error as the final message
        import json

        error_msg = {"output": f"Error: {str(e)}", "status": "error"}
        yield f"data: {json.dumps(error_msg)}\n\n"


@app.post("/agent/stream")
async def run_agent_stream(request: AgentRequest):
    """
    Execute the Biomni agent with streaming response.

    This endpoint streams the agent's execution steps in real-time using Server-Sent Events (SSE).
    Each step is sent as a JSON object with the format: {"output": "step content"}

    The stream ends with a message: {"output": "[DONE]", "status": "completed"}

    Example:
        curl -X POST "http://localhost:8000/agent/stream" \\
             -H "Content-Type: application/json" \\
             -d '{"query": "Predict ADMET properties for CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", "llm": "gpt-4.1-mini"}'
    """
    try:
        # Build configuration dictionary from request
        config = {}

        if request.data_path:
            config["path"] = request.data_path
        if request.llm:
            config["llm"] = request.llm
        if request.timeout_seconds:
            config["timeout_seconds"] = request.timeout_seconds
        if request.use_tool_retriever is not None:
            config["use_tool_retriever"] = request.use_tool_retriever
        if request.commercial_mode is not None:
            config["commercial_mode"] = request.commercial_mode

        # Note: temperature is a default_config parameter, so we need to set it differently
        if request.temperature is not None:
            from biomni.config import default_config

            default_config.temperature = request.temperature

        return StreamingResponse(
            step_generator(request.query, config),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",  # Disable buffering for nginx
            },
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/agent/run")
async def run_agent(request: AgentRequest):
    """
    Execute the Biomni agent and return the complete result.

    This endpoint runs the agent to completion and returns all steps at once.

    Example:
        curl -X POST "http://localhost:8000/agent/run" \\
             -H "Content-Type: application/json" \\
             -d '{"query": "Predict ADMET properties for CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", "llm": "gpt-4.1-mini"}'
    """
    try:
        # Build configuration dictionary from request
        config = {}

        if request.data_path:
            config["path"] = request.data_path
        if request.llm:
            config["llm"] = request.llm
        if request.timeout_seconds:
            config["timeout_seconds"] = request.timeout_seconds
        if request.use_tool_retriever is not None:
            config["use_tool_retriever"] = request.use_tool_retriever
        if request.commercial_mode is not None:
            config["commercial_mode"] = request.commercial_mode

        # Note: temperature is a default_config parameter
        if request.temperature is not None:
            from biomni.config import default_config

            default_config.temperature = request.temperature

        # Filter out None values from config
        agent_config = {k: v for k, v in config.items() if v is not None}

        # Create agent with custom configuration
        custom_agent = A1(**agent_config)

        # Run the agent and collect all steps
        steps = []
        for step in custom_agent.go_stream(request.query):
            steps.append(step)

        return {
            "status": "completed",
            "steps": steps,
            "total_steps": len(steps),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
