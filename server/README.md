# Biomni FastAPI Server

A FastAPI server that provides REST API endpoints to interact with the Biomni agent. The server supports configurable LLM parameters and real-time streaming of agent execution steps.

## Features

- **Streaming Endpoint**: Real-time streaming of agent execution steps using Server-Sent Events (SSE)
- **Non-Streaming Endpoint**: Execute agent and return complete results
- **Configurable LLM**: Support for different LLM models (GPT-4, Claude, etc.)
- **Custom Parameters**: Configure temperature, timeout, tool retriever, and more
- **Commercial Mode**: Toggle between academic and commercial dataset modes

## Installation

1. Install the required dependencies:

```bash
cd server
pip install -r requirements.txt
```

2. Make sure you have the main Biomni package installed:

```bash
cd ..
pip install -e .
```

3. Set up your environment variables in `.env` file (in the root directory):

```bash
# OpenAI API Key (if using GPT models)
OPENAI_API_KEY=your_openai_api_key

# Anthropic API Key (if using Claude models)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Other API keys as needed...
```

## Running the Server

### Development Mode

```bash
cd server
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start on `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## API Endpoints

### 1. Health Check

**GET** `/health`

Check if the server is running.

```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "message": "Biomni agent is ready"
}
```

### 2. Stream Agent Execution

**POST** `/agent/stream`

Execute the agent and stream results in real-time using Server-Sent Events (SSE).

**Request Body:**
```json
{
  "query": "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
  "llm": "gpt-4.1-mini",
  "temperature": 0.7,
  "timeout_seconds": 600,
  "use_tool_retriever": true,
  "commercial_mode": false,
  "data_path": "./data"
}
```

**Example using curl:**
```bash
curl -X POST "http://localhost:8000/agent/stream" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    "llm": "gpt-4.1-mini"
  }'
```

**Example using Python:**
```python
import requests
import json

url = "http://localhost:8000/agent/stream"
data = {
    "query": "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    "llm": "gpt-4.1-mini"
}

response = requests.post(url, json=data, stream=True)

for line in response.iter_lines():
    if line:
        line = line.decode('utf-8')
        if line.startswith('data: '):
            json_data = json.loads(line[6:])
            print(json_data['output'])
```

**Example using JavaScript/Node.js:**
```javascript
const fetch = require('node-fetch');

async function streamAgent() {
  const response = await fetch('http://localhost:8000/agent/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: 'Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
      llm: 'gpt-4.1-mini'
    })
  });

  const reader = response.body;
  reader.on('data', (chunk) => {
    const lines = chunk.toString().split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const json = JSON.parse(line.slice(6));
        console.log(json.output);
      }
    }
  });
}

streamAgent();
```

**Response Format:**

The response is a stream of Server-Sent Events. Each event has the format:
```
data: {"output": "step content here"}

data: {"output": "[DONE]", "status": "completed"}
```

### 3. Run Agent (Non-Streaming)

**POST** `/agent/run`

Execute the agent and return all steps at once.

**Request Body:** (same as streaming endpoint)
```json
{
  "query": "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
  "llm": "gpt-4.1-mini"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/agent/run" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    "llm": "gpt-4.1-mini"
  }'
```

**Response:**
```json
{
  "status": "completed",
  "steps": [
    {"output": "================================ Human Message =================================\n\nPredict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"},
    {"output": "..."},
    ...
  ],
  "total_steps": 8
}
```

## Request Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | Yes | - | The biomedical query to process |
| `llm` | string | No | `"claude-sonnet-4-5"` | LLM model to use (e.g., `"gpt-4.1-mini"`, `"claude-sonnet-4-5"`) |
| `temperature` | float | No | `0.7` | Temperature for LLM sampling (0.0 to 2.0) |
| `timeout_seconds` | integer | No | `600` | Timeout for code execution in seconds |
| `use_tool_retriever` | boolean | No | `true` | Whether to use tool retriever |
| `commercial_mode` | boolean | No | `false` | Use only commercial-licensed datasets |
| `data_path` | string | No | `"./data"` | Path to data directory |

## Example Output

Here's what the streamed output looks like (similar to the SAMPLE_RUN.md):

```
================================ Human Message =================================

Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O

================================== Ai Message ==================================

To predict the ADMET properties for the given compound, I will follow these steps:
1. Import the required function predict_admet_properties from the pharmacology module.
2. Use the function to analyze the provided SMILES string.
3. Print out the predicted ADMET properties for review.

<execute>
from biomni.tool.pharmacology import predict_admet_properties

smiles = ["CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"]
admet_result = predict_admet_properties(smiles)
print("Predicted ADMET properties:")
print(admet_result)
</execute>

================================== Ai Message ==================================

<observation>
Predicted ADMET properties:
Research Log for ADMET Predictions:
-------------------------------------

Compound SMILES: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O
Predicted ADMET properties:
- Solubility: -3.47 log mol/L
- Lipophilicity: 0.17 (log-ratio)
- Absorption (Caco-2 permeability): -4.89 cm/s
- Absorption (HIA): 89.76 %
...
</observation>

[DONE]
```

## Error Handling

If an error occurs during agent execution, the stream will end with:
```json
{
  "output": "Error: <error message>",
  "status": "error"
}
```

## CORS Configuration

By default, the server accepts requests from any origin. For production, update the CORS settings in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Docker Support (Optional)

Create a `Dockerfile` in the server directory:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t biomni-server .
docker run -p 8000:8000 -v $(pwd)/../data:/app/data biomni-server
```

## Troubleshooting

### Issue: "Agent not initialized"
Make sure the server has fully started before making requests. Check the console for "Biomni agent initialized successfully".

### Issue: Slow first request
The first request may take longer as the agent downloads required data files (~11GB). Subsequent requests will be faster.

### Issue: Timeout errors
Increase the `timeout_seconds` parameter if your queries require longer execution time.

## License

This server is part of the Biomni project. See the main project license for details.
