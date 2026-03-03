# AGENT 9: Security and Feature Hard Audit

## Priority: HIGH
## Status: Pending

**Context:** The previous agent has performed a massive expansion of the application, migrating the single-provider OpenRouter model to a fully dynamic Multi-Provider engine. The codebase now natively supports: OpenRouter, OpenAI, Anthropic, Google AI, Groq, NVIDIA NIM, Together AI, Qwen (DashScope), Mistral AI, DeepSeek, Moonshot (Kimi), MiniMax, and Ollama (Local). Additionally, the Application Settings are defaulted to 4 active seats for user ease. Features like the 'model search' dynamically query API providers directly now (e.g. hitting `api.mistral.ai/v1/models` instead of `openrouter.ai/api/v1/models`). The chat proxy `/api/chat.js` has also been re-wired.

This chat has gotten too large, so everything has been dumped into `progress.txt`, `error.md`, and the `README.md`. It is now your job to verify *everything*.

### The Mission
1. **Security Audit**: Ensure the `api/chat.js` Serverless Proxy is impenetrable.
   - Verify that NO API keys can leak into the browser `localStorage` under any circumstance.
   - Check the Rate-Limiting mechanisms.
   - Ensure the Vercel env variable mapping is robust (e.g. `QWEN_API_KEY`, `MISTRAL_API_KEY`, `DEEPSEEK_API_KEY`).
2. **Feature Audit: Dynamic API Provider Search**: Enable your browser subagent and methodically test the model selection UI.
   - Select a provider like Nvidia, type a model name into the search bar, and verify the dropdown populates ONLY Nvidia models.
   - Verify that providers without public model-list endpoints (like Anthropic and Google) correctly fall back to the curated `FALLBACK_MODELS` list in `script.js`.
   - Update `todo.md` (or this file) with a definitive list of supported model endpoints and any gaps.
3. **Cross-Browser Verification**: Does the application still function flawlessly on mobile widths? Do the glassmorphism CSS aesthetics still look premium?
4. **Proxy Chat Execution**: Test a full multi-agent 4-seat sequence utilizing the Custom Endpoint logic to make sure the HTTP headers are passing the dynamic payloads correctly. No "half-way" verification allowed.

---

### Step-By-Step Checklist

- [ ] Run `npx serve` and launch browser validation.
- [ ] In `script.js`, audit `fetchProviderModels()` implementation. Check endpoint mapping accuracy.
- [ ] In `script.js`, audit `fetchAIResponse()`. Check that it passes the `SESSION.provider` payload instead of hardcoding OpenRouter.
- [ ] In `/api/chat.js`, audit `handler()`. Verify that `PROVIDER_CONFIG` supports Mistral, Qwen, Deepseek accurately.
- [ ] Provide proof (Browser Subagent screenshots) of an empty `localStorage` after saving an API key. 
- [ ] Run a 4-Seat debate (using free providers or mock responses) to confirm chat flow still behaves normally without crashing.

### Reference Notes
- `app.html` has been confirmed to default to `4 Seats` under the `seat-select` ID.
- Kimi's API uses `https://api.moonshot.cn/v1/models`.
- Minimax uses `https://api.minimax.chat/v1/models`.
- Qwen uses `https://dashscope.aliyuncs.com/compatible-mode/v1/models`.

If you spot bugs, log them in `error.md` and use the Ralphy `/loop` protocol to Fix -> Verify -> Check off.
