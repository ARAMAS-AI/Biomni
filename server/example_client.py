"""
Example client script for testing the Biomni FastAPI server.

This script demonstrates how to interact with the streaming endpoint.
"""

import json

import requests


def stream_agent_query(query: str, llm: str = "gpt-4.1-mini", base_url: str = "http://localhost:8000"):
    """
    Stream agent execution results in real-time.

    Args:
        query: The biomedical query to process
        llm: The LLM model to use
        base_url: Base URL of the FastAPI server
    """
    url = f"{base_url}/agent/stream"

    payload = {
        "query": query,
        "llm": llm,
    }

    print(f"Sending query to {url}...")
    print(f"Query: {query}")
    print(f"LLM: {llm}")
    print("\n" + "=" * 80)
    print("STREAMING RESULTS:")
    print("=" * 80 + "\n")

    try:
        response = requests.post(url, json=payload, stream=True, timeout=None)
        response.raise_for_status()

        for line in response.iter_lines():
            if line:
                line_str = line.decode("utf-8")

                # SSE format: "data: {json}"
                if line_str.startswith("data: "):
                    try:
                        json_data = json.loads(line_str[6:])
                        output = json_data.get("output", "")
                        status = json_data.get("status", "")

                        if output == "[DONE]":
                            print("\n" + "=" * 80)
                            print(f"COMPLETED - Status: {status}")
                            print("=" * 80)
                            break
                        elif status == "error":
                            print("\n" + "=" * 80)
                            print(f"ERROR: {output}")
                            print("=" * 80)
                            break
                        else:
                            print(output)

                    except json.JSONDecodeError as e:
                        print(f"Failed to parse JSON: {e}")
                        print(f"Raw line: {line_str}")

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
    except KeyboardInterrupt:
        print("\n\nStream interrupted by user")


def run_agent_query(query: str, llm: str = "gpt-4.1-mini", base_url: str = "http://localhost:8000"):
    """
    Run agent query and get complete results at once.

    Args:
        query: The biomedical query to process
        llm: The LLM model to use
        base_url: Base URL of the FastAPI server
    """
    url = f"{base_url}/agent/run"

    payload = {
        "query": query,
        "llm": llm,
    }

    print(f"Sending query to {url}...")
    print(f"Query: {query}")
    print(f"LLM: {llm}")
    print("\n" + "=" * 80)
    print("RESULTS:")
    print("=" * 80 + "\n")

    try:
        response = requests.post(url, json=payload, timeout=None)
        response.raise_for_status()

        result = response.json()
        print(f"Status: {result['status']}")
        print(f"Total Steps: {result['total_steps']}\n")

        for i, step in enumerate(result["steps"], 1):
            print(f"Step {i}:")
            print(step["output"])
            print("-" * 80)

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")


if __name__ == "__main__":
    # Example query from SAMPLE_RUN.md
    query = "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"

    # Test streaming endpoint
    print("Testing STREAMING endpoint...")
    print("=" * 80)
    stream_agent_query(query, llm="gpt-4.1-mini")

    # Uncomment to test non-streaming endpoint
    # print("\n\nTesting NON-STREAMING endpoint...")
    # print("=" * 80)
    # run_agent_query(query, llm="gpt-4.1-mini")
