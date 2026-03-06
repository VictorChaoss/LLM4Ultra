# LLM4 Roundtable

Watch the world's four leading AI models — ChatGPT, Claude, Gemini, and Grok — debate each other autonomously in real-time.

🌐 **Live at:** [llm-4-roundtable.vercel.app](https://llm-4-roundtable.vercel.app)

## What Makes It Different

Unlike side-by-side comparison tools, LLM4 runs a **sequential debate** — each agent reads all previous responses and reacts directly to what others said, by name. This creates emergent reasoning you can't get from parallel prompting.

## Quick Start (Local Dev)

1. Clone this repo
2. Get a free API key from [Groq](https://console.groq.com) or [OpenRouter](https://openrouter.ai)
3. Open `app.html` in a browser (or serve locally with `npx serve .`)
4. Enter your API key in the setup screen — it stays in memory only, never saved

## Deploy to Vercel

1. Fork this repo
2. Import to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (see `DEPLOYMENT.md`):
   - `GROQ_API_KEY` — free at console.groq.com
   - `OPENROUTER_API_KEY` — free at openrouter.ai
4. Push — Vercel auto-deploys

## Architecture

```
Browser → /api/chat (Vercel serverless) → LLM Provider
            ↑ API key lives HERE only
            in Vercel Environment Variables
```

## File Structure

```
├── api/chat.js        — Secure backend proxy (Vercel serverless function)
├── app.html           — Main roundtable app
├── script.js          — Frontend engine (1243 lines, all features)
├── style.css          — Styles including boot, setup, voice, vision
├── vercel.json        — Vercel config + security headers
├── index.html         — Landing page
├── AGENT_NOTES.md     — AI dev bible (read before making changes)
└── DEPLOYMENT.md      — Vercel deployment guide
```

## For Developers / AI Agents

Read `AGENT_NOTES.md` before touching anything. It contains:
- Exact line numbers for every feature in every file
- Merge priority order (what to do first)
- Feature flags and how to activate them
- What's complete vs what still needs to be built

## Features

- **4-agent sequential debate** — agents read and respond to each other
- **Agent name-awareness** — each AI knows who else is at the table
- **Multi-provider** — Native support for OpenRouter, OpenAI, Anthropic, Google AI, Groq, NVIDIA NIM, Together AI, Qwen (DashScope), Mistral AI, DeepSeek, Moonshot (Kimi), MiniMax, Ollama (Local), and Custom Endpoints.
- **Dynamic Model Picker** — Swap any seat's model on the fly. Dynamically fetches the up-to-date `/v1/models` list from your actively selected API provider so you're not restricted to OpenRouter.
- **Premium UI & SVGs** — Glassmorphism design with official, dynamic SVG logos for all providers (OpenAI, Claude, Gemini, DeepSeek, Qwen, Meta, Grok, Mistral)
- **Consensus & Synthesis** — Auto-generates a neutral summary of agreements and tensions after every round
- **Auto-Pilot** — continuous debate with rotating prompts
- **Voice TTS/STT** — free browser-native, each agent has a different voice
- **Image / Vision** — drag-drop images into the debate
- **Export transcript** — download full debate as .txt
- **Boot sequence** — branded terminal boot screen
- **Secure key handling** — keys in memory only, never stored or logged
- **Rate limiting** — per-IP protection via serverless proxy

## Roadmap

- **Phase 2:** Debate Modes (Devil's Advocate, Oxford, Steelman), Auto-Rater leaderboard, disagreement visualization
- **Phase 3:** Browser extension, web search pre-debate

## License

MIT
