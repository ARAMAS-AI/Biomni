Here's that sequence of commands formatted as a README file:

-----

# Biomni Project Setup

This guide outlines the steps to set up and run the Biomni server and web UI.

## 1\. Environment Setup

First, navigate to the environment directory and create the Conda environment using the provided YAML file.

```bash
cd Biomni/biomni_env
conda env create -f aramas_environment.yml
```

Once the environment is created, activate it:

```bash
conda activate biomni_e1
```

Then, return to the root `Biomni` directory:

```bash
cd ..
```

## 2\. Configure Environment Variables

You must set your environment variables, such as your `OPENAI_API_KEY`. You can do this in two ways:

**Option 1: Using a `.env` file**

Create a `.env` file in the project's root or server directory (check project documentation for the correct location) and add your keys:

```
OPENAI_API_KEY=your_api_key_here
ANOTHER_KEY=your_other_value_here
```

**Option 2: Exporting variables (Linux/macOS)**

Export the variables directly in your terminal session:

```bash
export OPENAI_API_KEY="your_api_key_here"
export ANOTHER_KEY="your_other_value_here"
```

## 3\. Run the Backend Server

Navigate to the server directory and start the server using the `start_server` script. You must specify the language model you wish to use.

```bash
cd server
bash start_server [llm_name]
```

**Examples:**

  * To use `gpt-4.1-mini`:
    ```bash
    bash start_server gpt-4.1-mini
    ```
  * To use `claude-sonnet-4.5`:
    ```bash
    bash start_server claude-sonnet-4.5
    ```

Keep this terminal window open, as it is now running the backend.

## 4\. Run the Frontend Web UI

Open a **new** terminal window or tab.

Navigate to the web UI directory:

```bash
cd Biomni/webui
```

If this is your first time setting up the project, install the necessary dependencies:

```bash
npm install
```

Once dependencies are installed (or if they are already installed), start the development server:

```bash
npm run dev
```

## 5\. Access the Application

Your application should now be running. You can access it by opening your web browser and navigating to:

[http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)


# Sample Queries (Verified)

- Predict ADMET properties for this compound: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O