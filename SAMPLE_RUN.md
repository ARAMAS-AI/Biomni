(biomni_e1) balaji@Balajis-MacBook-Air-2 Biomni % python test.py
Loaded environment variables from .env
🎓 Academic mode: Using all datasets (including non-commercial)

==================================================
🔧 BIOMNI CONFIGURATION
==================================================
📋 DEFAULT CONFIG (Including Database LLM):
  Path: ./data
  Timeout Seconds: 600
  Llm: gpt-4.1-mini
  Temperature: 0.7
  Use Tool Retriever: True
  Commercial Mode: Academic (all datasets)
==================================================

Checking and downloading missing data lake files...
Using prompt-based retrieval with the agent's LLM
================================ Human Message =================================

Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O
STEP:  {'output': '================================ Human Message =================================\n\nPredict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O'}
parsing error...
================================ Human Message =================================

Each response must include thinking process followed by either <execute> or <solution> tag. But there are no tags in the current response. Please follow the instruction, fix and regenerate the response again.
STEP:  {'output': '================================ Human Message =================================\n\nEach response must include thinking process followed by either <execute> or <solution> tag. But there are no tags in the current response. Please follow the instruction, fix and regenerate the response again.'}
================================== Ai Message ==================================

To predict the ADMET properties for the given compound, I will follow these steps:
1. Import the required function predict_admet_properties from the pharmacology module.
2. Use the function to analyze the provided SMILES string.
3. Print out the predicted ADMET properties for review.

Now, I will proceed with step 1 and 2 by importing the function and making the prediction.

<execute>
from biomni.tool.pharmacology import predict_admet_properties

smiles = ["CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"]
admet_result = predict_admet_properties(smiles)
print("Predicted ADMET properties:")
print(admet_result)
</execute>
STEP:  {'output': '================================== Ai Message ==================================\n\nTo predict the ADMET properties for the given compound, I will follow these steps:\n1. Import the required function predict_admet_properties from the pharmacology module.\n2. Use the function to analyze the provided SMILES string.\n3. Print out the predicted ADMET properties for review.\n\nNow, I will proceed with step 1 and 2 by importing the function and making the prediction.\n\n<execute>\nfrom biomni.tool.pharmacology import predict_admet_properties\n\nsmiles = ["CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"]\nadmet_result = predict_admet_properties(smiles)\nprint("Predicted ADMET properties:")\nprint(admet_result)\n</execute>'}
================================== Ai Message ==================================

<observation>Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Dataset already downloaded in the local system...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Drug Property Prediction Mode...
in total: 1 drugs
encoding drug...
unique drugs: 1
do not do train/test split on the data for already splitted data
predicting...
Predicted ADMET properties:
Research Log for ADMET Predictions:
-------------------------------------

Compound SMILES: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O
Predicted ADMET properties:
- Solubility: -3.47 log mol/L
- Lipophilicity: 0.17 (log-ratio)
- Absorption (Caco-2 permeability): -4.89 cm/s
- Absorption (HIA): 89.76 %
- Absorption (Pgp Inhibitor): 39.19 %
- Absorption (Bioavailability): 75.25 %
- Distribution (BBB permeation): 56.93 %
- Distribution (PPBR): 83.89 %
- Metabolism (CYP2C19): 17.12 %
- Metabolism (CYP2D6): 23.17 %
- Metabolism (CYP3A4): 3.05 %
- Metabolism (CYP1A2): 8.95 %
- Metabolism (CYP2C9): 5.96 %
- Excretion (Half-life): 8.05 h
- Excretion (Clearance): 7.15 mL/min/kg
- Clinical Toxicity: 26.06 %
-------------------------------------

</observation>
STEP:  {'output': '================================== Ai Message ==================================\n\n<observation>Dataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDataset already downloaded in the local system...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nDrug Property Prediction Mode...\nin total: 1 drugs\nencoding drug...\nunique drugs: 1\ndo not do train/test split on the data for already splitted data\npredicting...\nPredicted ADMET properties:\nResearch Log for ADMET Predictions:\n-------------------------------------\n\nCompound SMILES: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O\nPredicted ADMET properties:\n- Solubility: -3.47 log mol/L\n- Lipophilicity: 0.17 (log-ratio)\n- Absorption (Caco-2 permeability): -4.89 cm/s\n- Absorption (HIA): 89.76 %\n- Absorption (Pgp Inhibitor): 39.19 %\n- Absorption (Bioavailability): 75.25 %\n- Distribution (BBB permeation): 56.93 %\n- Distribution (PPBR): 83.89 %\n- Metabolism (CYP2C19): 17.12 %\n- Metabolism (CYP2D6): 23.17 %\n- Metabolism (CYP3A4): 3.05 %\n- Metabolism (CYP1A2): 8.95 %\n- Metabolism (CYP2C9): 5.96 %\n- Excretion (Half-life): 8.05 h\n- Excretion (Clearance): 7.15 mL/min/kg\n- Clinical Toxicity: 26.06 %\n-------------------------------------\n\n</observation>'}
================================== Ai Message ==================================

The ADMET properties have been predicted for the compound with SMILES: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O.

The key predicted properties are:
- Solubility: -3.47 log mol/L
- Lipophilicity: 0.17 (log-ratio)
- Absorption (Caco-2 permeability): -4.89 cm/s
- Absorption (HIA): 89.76 %
- Absorption (Pgp Inhibitor): 39.19 %
- Absorption (Bioavailability): 75.25 %
- Distribution (BBB permeation): 56.93 %
- Distribution (PPBR): 83.89 %
- Metabolism (various CYP enzymes): low to moderate percentages (3.05% - 23.17%)
- Excretion (Half-life): 8.05 hours
- Excretion (Clearance): 7.15 mL/min/kg
- Clinical Toxicity: 26.06 %

If you want, I can provide detailed interpretation or export this data.

<solution>
Predicted ADMET properties for the compound CC(C)CC1=CC=C(C=C1)C(C)C(=O)O:
- Solubility: -3.47 log mol/L
- Lipophilicity: 0.17 (log-ratio)
- Absorption (Caco-2 permeability): -4.89 cm/s
- Absorption (HIA): 89.76 %
- Absorption (Pgp Inhibitor): 39.19 %
- Absorption (Bioavailability): 75.25 %
- Distribution (BBB permeation): 56.93 %
- Distribution (PPBR): 83.89 %
- Metabolism (CYP2C19): 17.12 %
- Metabolism (CYP2D6): 23.17 %
- Metabolism (CYP3A4): 3.05 %
- Metabolism (CYP1A2): 8.95 %
- Metabolism (CYP2C9): 5.96 %
- Excretion (Half-life): 8.05 h
- Excretion (Clearance): 7.15 mL/min/kg
- Clinical Toxicity: 26.06 %
</solution>
STEP:  {'output': '================================== Ai Message ==================================\n\nThe ADMET properties have been predicted for the compound with SMILES: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O.\n\nThe key predicted properties are:\n- Solubility: -3.47 log mol/L\n- Lipophilicity: 0.17 (log-ratio)\n- Absorption (Caco-2 permeability): -4.89 cm/s\n- Absorption (HIA): 89.76 %\n- Absorption (Pgp Inhibitor): 39.19 %\n- Absorption (Bioavailability): 75.25 %\n- Distribution (BBB permeation): 56.93 %\n- Distribution (PPBR): 83.89 %\n- Metabolism (various CYP enzymes): low to moderate percentages (3.05% - 23.17%)\n- Excretion (Half-life): 8.05 hours\n- Excretion (Clearance): 7.15 mL/min/kg\n- Clinical Toxicity: 26.06 %\n\nIf you want, I can provide detailed interpretation or export this data.\n\n<solution>\nPredicted ADMET properties for the compound CC(C)CC1=CC=C(C=C1)C(C)C(=O)O:\n- Solubility: -3.47 log mol/L\n- Lipophilicity: 0.17 (log-ratio)\n- Absorption (Caco-2 permeability): -4.89 cm/s\n- Absorption (HIA): 89.76 %\n- Absorption (Pgp Inhibitor): 39.19 %\n- Absorption (Bioavailability): 75.25 %\n- Distribution (BBB permeation): 56.93 %\n- Distribution (PPBR): 83.89 %\n- Metabolism (CYP2C19): 17.12 %\n- Metabolism (CYP2D6): 23.17 %\n- Metabolism (CYP3A4): 3.05 %\n- Metabolism (CYP1A2): 8.95 %\n- Metabolism (CYP2C9): 5.96 %\n- Excretion (Half-life): 8.05 h\n- Excretion (Clearance): 7.15 mL/min/kg\n- Clinical Toxicity: 26.06 %\n</solution>'}

that was the result for 

python test.py
