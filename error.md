# Error Log

- **[2026-03-03] powershell `npx serve` blocked:** Execution of `npx serve` was blocked by Windows PowerShell execution policies. Workaround: Ran inside WSL using `wsl -e bash -c "npx serve -l 8080 ."`.
- **[2026-03-03] Hardcoded OpenRouter URL in proxy logic:** Found that `/api/chat.js` proxy and `script.js` local fetch paths were still hardcoded to OpenRouter API even if another provider (e.g. Qwen, Mistral) was selected. Fixed by extracting `endpoint` resolution into dynamic mapped `if-else` blocks based on `SESSION.provider`.
- **[2026-03-03] Browser subagent DOM focus tracking:** During browser verification of provider API key placeholders, UI dropdown elements were sometimes mis-targeted due to overlapping `z-index` and complex native `<select>` lists. Workaround: validated via direct DOM properties rather than simulated coordinate clicks.
