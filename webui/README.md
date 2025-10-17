# BiOmni WebUI

A React 19 chat interface for the BiOmni biomedical agent, built with TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Real-time streaming**: Connects to the BiOmni agent via Server-Sent Events (SSE)
- **Rich message rendering**: Displays agent thoughts, observations, and code execution
- **Markdown support**: Full markdown rendering with GitHub Flavored Markdown
- **Code highlighting**: Syntax highlighting for code blocks using rehype-highlight
- **Math rendering**: LaTeX/KaTeX support for mathematical expressions
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- BiOmni server running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Architecture

### Components

- **App.tsx**: Main application component with chat state management
- **ChatMessage.tsx**: Renders individual messages with user/assistant avatars
- **MessageContent.tsx**: Handles rendering of thought/observation/code blocks
- **ChatInput.tsx**: Input component for sending messages
- **ui/**: shadcn/ui components (Button, Input, Card, ScrollArea)

### Hooks

- **useAgentStream.ts**: Custom hook for handling SSE connections to the BiOmni agent

### API Integration

The app connects to the BiOmni server's `/agent/stream` endpoint which returns streaming JSON responses:

```json
{
  "thought": "The agent's reasoning...",
  "observation": "Output from code execution...",
  "code": "python code..."
}
```

Messages are streamed in real-time and rendered as they arrive.

## Configuration

### Server URL

To change the backend server URL, edit the fetch URL in `src/hooks/useAgentStream.ts`:

```typescript
const response = await fetch('http://localhost:8000/agent/stream', {
  // ...
});
```

### Styling

The app uses Tailwind CSS with custom theme variables defined in `src/index.css`. You can customize colors and styles by modifying the CSS variables.

## Tech Stack

- **React 19**: Latest version of React
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Re-usable component library
- **React Markdown**: Markdown rendering
- **rehype-highlight**: Code syntax highlighting
- **rehype-katex**: Math formula rendering
- **Lucide React**: Icon library

## License

See the main BiOmni repository for license information.
