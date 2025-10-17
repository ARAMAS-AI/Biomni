from biomni.agent import A1
from biomni.config import default_config

default_config.llm = "gpt-4.1-mini"

# Initialize the agent with data path, Data lake will be automatically downloaded on first run (~11GB)
agent = A1(path='./data')

# Execute biomedical tasks using natural language
# agent.go("Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O")

PROMPT  = """
Plan a CRISPR screen to identify genes that regulate T cell exhaustion,
        measured by the change in T cell receptor (TCR) signaling between acute
        (interleukin-2 [IL-2] only) and chronic (anti-CD3 and IL-2) stimulation conditions.
        Generate 32 genes that maximize the perturbation effect.
"""

# PROMPT = "Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"

for step in agent.go_stream(PROMPT):
    print('STEP: ', step)