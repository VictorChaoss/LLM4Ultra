# AGENT 12: Comprehensive Full Application Audit & Testing

## Objective
Perform a "hard audit" of the entire LLM4-Roundtable application. This entails a deep dive into all code (frontend and backend) to ensure quality, security, and feature completeness, followed by rigorous in-browser testing of all user flows.

## RULES (MANDATORY)
1.  **NO HALLUCINATIONS:** If a feature works, do not break it.
2.  **VISUAL PROOF:** Any UI tests must be accompanied by screenshots (use the `browser_subagent`).
3.  **NO DESTRUCTIVE ACTIONS:** Do not delete core files or alter the `.git` directory.
4.  **TEST BEFORE COMPLETION:** You must thoroughly test the app in the browser before marking this task as done.

## Phase 1: Code Audit
Your goal is to look at *all* the code to ensure architectural soundness.

1.  **Security Check:**
    *   Verify absolutely zero API keys are hardcoded in `app.html`, `script.js`, `style.css`, or `api/chat.js`.
    *   Confirm `api/chat.js` correctly uses Vercel environment variables (e.g., `process.env.OPENROUTER_API_KEY`).
    *   Confirm `script.js` stores the user's custom API key securely in memory (`SESSION.apiKey`) and not in `localStorage`.
2.  **Asset Check:**
    *   Check `PROVIDER_SVGS` in `script.js`. Verify the Grok logo is the correct slash logo, and Gemini is the sparkle logo.
    *   Ensure DeepSeek and Qwen SVGs are present.
3.  **Code Quality & Redundancy:**
    *   Scan `script.js` for dead code, unused CSS classes in `style.css`, or redundant logic.

## Phase 2: In-Browser Testing (Local Only)
You MUST launch the app locally (`npx serve -l 8080`) and perform ALL these tests rigorously. **Do NOT assume Vercel is working; everything must be proven locally first before handing off to the main developer for deployment.** Use the `browser_subagent` for these flow tests:

1.  **Model Swapping & UI Validation:**
    *   Open the app.
    *   Click on a seat model (e.g., ChatGPT).
    *   Verify the search menu pops up (`.seat-menu`).
    *   Type a search query and verify it filters.
    *   Select a new model (e.g., deepseek-r1). Verify the seat label updates correctly, and the avatar changes to the DeepSeek background and SVG.
2.  **Chat Functional Test:**
    *   Enter an API key in the settings modal.
    *   Send a message to the roundtable.
    *   Verify that multiple AI agents (e.g., Claude, LLama, DeepSeek) respond and their responses are synthesized correctly in the UI.
3.  **Page Navigation:**
    *   Verify the `index.html` landing page loads.
    *   Click the "Launch App" button and ensure it navigates to `app.html`.
    *   Verify the Web Search toggle in settings is visually present and clickable.

## Phase 3: Final Reporting
1.  Document *every* bug found and fixed in `error.md` and `progress.txt`.
2.  If the app passes all tests flawlessly, update `progress.txt` asserting the app is production-ready.
3.  Create a detailed report of your findings in `audit_report.md`.
