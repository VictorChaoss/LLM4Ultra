# 🧠 LLM4 ROUNDTABLE — MASTER DEV BIBLE v3.1
### For: Antigravity AI (the merge assistant)
### Updated: March 2026

---

## ⚠️ READ THIS ENTIRE FILE BEFORE WRITING A SINGLE LINE OF CODE ⚠️

This document is your complete source of truth. It tells you:
- Every feature, what file it lives in, and the exact line numbers
- What's already done in V31 vs what still needs to be built
- How the V31 zip relates to the live GitHub codebase
- The full competitive landscape and what to steal from competitors
- The Phase 2 roadmap including Debate Modes architecture

---

## PART 0 — HOW THESE FILES RELATE

There are three codebases you need to understand:

**① MAIN (live GitHub)** — `https://github.com/[repo]/LLM4-Roundtable`
The production codebase currently live at `https://llm-4-roundtable.vercel.app/`
Key files: `app.html` (176 lines), `script.js` (463 lines), `style.css` (1238 lines)
This is what real users see. DO NOT overwrite it blindly.

**② V31 ZIP** — the file you have open right now
A reference implementation. NOT a replacement. A surgical donor.
Key files: `app.html` (245 lines), `script.js` (1243 lines), `style.css` (1407 lines), `api/chat.js` (402 lines), `vercel.json`
Think of V31 as the template you pick from. Extract features from here and graft them into MAIN.

**③ YOUR RELATIONSHIP TO BOTH**
Your job is to MERGE V31 features INTO MAIN. Never overwrite MAIN wholesale.
The MAIN site has custom mobile CSS and UI tweaks that will break if you copy-paste.
Always compare files side by side. Always test after each priority.

---

## PART 1 — COMPLETE FEATURE MAP (Every Feature, File, and Line)

This table shows where every feature lives in V31. Use this as your surgical guide.

---

### 🔵 `script.js` (1243 lines total)

| Feature | Lines | Status | Notes |
|---|---|---|---|
| File header / banner comment | 1–18 | ✅ V31 only | Update version string when merging |
| PROVIDERS array (5 providers) | 25–79 | ✅ V31 only | MAIN has OpenRouter hardcoded only |
| AI_MODELS + persona() functions | 85–134 | ✅ V31 only | MAIN has wrong model IDs + generic prompts |
| AGENT_ORDER array | 136 | ✅ Both | Same in both |
| SESSION object (secure key store) | 142–147 | ✅ V31 only | MAIN uses localStorage — critical bug |
| App state variables | 149–156 | ✅ Both | roundNumber, isGenerating, etc. |
| MAX_HISTORY = 40 | 160 | ✅ V31 only | MAIN has no cap — will crash on long debates |
| MAX_RETRIES = 2 | 163 | ✅ V31 only | MAIN has no retry — silent fail on bad requests |
| Helper: `$ = id => getElementById` | 164 | ✅ Both | Same |
| BOOT_LINES array | 171–182 | ✅ V31 only | Pure branding — 10 terminal boot lines |
| runBootSequence() | 184–203 | ✅ V31 only | Animates boot screen, then shows setup |
| selectedProviderId var | 210 | ✅ V31 only | Tracks which provider card is selected |
| showSetupScreen() | 212–219 | ✅ V31 only | Entry point for setup UI |
| buildProviderList() | 221–229 | ✅ V31 only | Renders provider cards dynamically |
| buildFeatureToggles() | 232–249 | ✅ V31 only | Renders TTS/STT/Vision toggle rows |
| selectProvider() | 251–263 | ✅ V31 only | Handles provider card selection |
| canLaunch() | 266–270 | ✅ V31 only | Validates form before enabling launch |
| updateLaunchBtn() | 272–278 | ✅ V31 only | Updates button text/state |
| launchApp() | 281–300 | ✅ V31 only | Reads key into SESSION, wipes input |
| goToConfig() | 302–307 | ✅ V31 only | Back button — returns to setup screen |
| initApp() | 312–341 | ✅ V31 (expanded) | MAIN has basic version; V31 adds voice/vision/config buttons |
| Voice engine (TTS + STT) | 348–411 | ✅ V31 only | Browser-native, no API key needed |
| Vision engine (image upload) | 413–510 | ✅ V31 only | Drag-drop, base64 encoding, preview |
| shareDebate() | 515–528 | ✅ V31 only | Copies transcript to clipboard |
| sendMessage() | 533–557 | ✅ V31 (expanded) | V31 adds image support, typing dots |
| runRoundtableCycle() | 562–648 | ✅ V31 (major upgrade) | History cap, retry logic, agent pipeline hook |
| Varied autopilot continuations | 622–630 | ✅ V31 only | 7 rotating prompts; MAIN has 1 static string |
| synthesizeConsensus() | 656–690 | ✅ Both (V31 improved) | V31 routes through proxy when on Vercel |
| resolveUrl() | 695–698 | ✅ V31 only | Picks correct URL per provider |
| resolveModel() | 699–703 | ✅ V31 only | Picks correct model per provider per agent |
| resolveKey() | 705–709 | ✅ V31 only | Gets key from SESSION (not localStorage) |
| buildHeaders() | 710–719 | ✅ V31 only | Builds request headers per provider |
| fetchAIResponse() | 721–793 | ✅ V31 (major upgrade) | Dual-path: proxy on Vercel, direct on local |
| getMockResponse() | 796–815 | ✅ V31 only | Demo mode — realistic mock replies |
| stopGeneration() | 820–826 | ✅ Both | Same |
| togglePause() | 827–832 | ✅ Both | Same |
| lockControls() | 833–836 | ✅ Both | Same |
| handleTextareaResize() | 837–842 | ✅ Both | Same |
| handleKeyDown() | 843–845 | ✅ Both | Same |
| RANDOM_TOPICS array (14 topics) | 850–865 | ✅ V31 (expanded) | MAIN has fewer topics |
| startRandomTopic() | 866–871 | ✅ Both | Same |
| exportTranscript() | 878–888 | ✅ V31 only | Downloads .txt file — not in MAIN |
| clearChat() | 893–899 | ✅ Both | Same |
| sleep() / escHtml() utilities | 904–907 | ✅ Both | Same |
| FUTURE_AGENT_MODE flag | 954 | ✅ V31 only | Master switch — default false |
| ENABLE_LOGGING flag | 959 | ✅ V31 only | Console logger — default false |
| logRequest() | ~961 | ✅ V31 only | Client-side logging stub |
| detectDisagreement() | 998–1040 | ✅ V31 only | Labels agreement: consensus/partial/contradiction |
| synthesizeResponses() | ~1042–1107 | ✅ V31 only | Merges outputs, finds shared/unique points |
| arbitrate() | 1122–1159 | ✅ V31 only | Ranks responses by structural quality |
| runAgentPipeline() | 1172–1216 | ✅ V31 only | Orchestrates detect+synthesize+arbitrate |
| Bootstrap / DOMContentLoaded | 1243 | ✅ Both | V31 calls runBootSequence() instead of initApp() |

---

### 🔵 `app.html` (245 lines total)

| Feature / Section | Lines | Status | Notes |
|---|---|---|---|
| Boot screen div | 22–25 | ✅ V31 only | Hidden until JS shows it |
| Setup screen (full) | 30–65 | ✅ V31 only | Provider list + feature toggles + launch btn |
| App shell wrapper | 71 | ✅ Both | Same structure |
| Sidebar: brand + social links | 74–90 | ✅ Both | V31 has cleaner markup |
| Sidebar: CA container | 85–89 | ✅ Both | Keep MAIN's copyCA() logic |
| Sidebar: transcript panel | 92–113 | ✅ Both | V31 adds export-btn + share-btn |
| Sidebar: active-provider tag | 111 | ✅ V31 only | Shows current provider name |
| Consensus panel | 122–125 | ✅ Both | Same, but MAIN may not have this |
| Roundtable seating (4 agents) | 127–176 | ✅ Both | Same layout |
| Voice bar | 184–187 | ✅ V31 only | Listening... indicator |
| Vision bar | 192–196 | ✅ V31 only | Image preview + clear button |
| Input controls: Random/Clear/Pause/Stop | 198–215 | ✅ Both | V31 adds mobile-transcript-btn |
| Autopilot toggle | 216–220 | ✅ Both | Same |
| Input wrapper: attach/mic/send | 223–234 | ✅ V31 (expanded) | MAIN doesn't have attach-btn or mic-btn |
| Vision file input (hidden) | 237 | ✅ V31 only | Hidden file picker for images |
| Script tags (marked.js + script.js) | 242–243 | ✅ Both | V31 uses ?v=3.0 cache-bust |

---

### 🔵 `api/chat.js` (402 lines total)

| Feature / Section | Lines | Status | Notes |
|---|---|---|---|
| Rate limit config (MAX_REQUESTS=20, MAX_TOKENS=300) | 56–58 | ✅ V31 only | Not in MAIN at all |
| In-memory IP rate store | 63–77 | ✅ V31 only | Resets on cold start |
| PROVIDER_CONFIG (5 providers) | 80–110 | ✅ V31 only | Reads env vars for keys |
| CORS allowed origins | 113–119 | ✅ V31 only | Add your domain here |
| main handler() | 132–244 | ✅ V31 only | Full proxy: validate → rate-limit → forward |
| ANON AI: Enhanced rate limiting | 265–303 | ✅ V31 (off by default) | Per-minute + per-day limits |
| ANON AI: Server-side logging | 305–322 | ✅ V31 (off by default) | ENABLE_SERVER_LOGGING=false |
| ANON AI: Abuse detection | 324–366 | ✅ V31 (off by default) | Blocks duplicate prompts, giant payloads |
| Merge instructions for api additions | 368–401 | ✅ V31 only | Read before activating above features |

---

### 🔵 `style.css` (1407 lines total — diff MAIN at 1238)

V31 adds ~169 lines of new CSS. The key additions are:

| CSS Section | Approximate Lines | Notes |
|---|---|---|
| Boot screen styles | ~50 lines | `.boot-screen`, `.boot-logo`, `.boot-lines`, `.boot-ok`, `.boot-warn` |
| Setup screen styles | ~120 lines | `.setup-card`, `.pcard`, `.pcard-badge`, `.feat-row`, `.feat-toggle`, `.launch-btn` |
| Voice bar styles | ~20 lines | `.voice-bar`, `.voice-pulse` |
| Vision bar styles | ~20 lines | `.vision-bar`, `#vision-preview` |
| All existing styles | Preserved | V31 keeps all of MAIN's mobile CSS — verify before merging |

**CRITICAL:** Before merging style.css, run a diff between MAIN and V31. Preserve every `@media` block from MAIN. Add V31's new sections (boot, setup, voice, vision) to the end of MAIN's CSS.

---

### 🔵 `vercel.json` (new file — not in MAIN)

```json
{
  "functions": {
    "api/chat.js": {
      "maxDuration": 30
    }
  }
}
```

Drop this in the project root. Required for the serverless function to work on Vercel.

---

## PART 2 — COMPETITIVE INTELLIGENCE (2025–2026 Research)

### Who LLM4 Competes With

| Platform | What They Do | LLM4's Edge |
|---|---|---|
| **ChatHub** | Side-by-side parallel responses, 20+ models | No debate — models never talk to each other |
| **Poe (Quora)** | Tag multiple bots in one thread | Manual tagging, no automation, no structured debate |
| **LMArena** | Blind A/B pairwise voting for benchmarks | No debate loop, academic feel, not consumer-friendly |
| **LMSYS Chatbot Arena** | Crowdsourced human votes, Arena-Hard-Auto | Benchmark tool, not an experience; now uses LLM-as-Judge |
| **OverallGPT** | Simultaneous multi-model responses | Parallel only, models don't respond to each other |
| **LiveBench** | Automated scoring, contamination-resistant | Research tool, no consumer interface |
| **Agent4Debate (ICASSP 2026)** | 4-role academic debate (Searcher, Analyzer, Writer, Reviewer) | Academic paper, no live product |
| **MAD (Multi-Agent Debate)** | Multi-agent debate research framework | Proven that debate only works when models READ each other |

### LLM4's Unique Position

LLM4 is the **only consumer product** that:
1. Runs a **sequential debate** where each agent reads all previous outputs
2. Agents are **persona-aware** and reference each other by name
3. Has a **branded experience** (boot screen, roundtable UI, meme coin identity)
4. Is **free to use** with your own API key (multiple providers)
5. Will have **emergent reasoning analysis** (Phase 2) via the ANON AI pipeline

---

### Features to Steal (Prioritized)

**From LMSYS — LLM-as-Judge (Phase 2, HIGH PRIORITY)**
Arena-Hard-Auto uses GPT-4.1/Gemini-2.5 to auto-score debate quality instead of waiting for human votes.
→ LLM4 Adaptation: After each round, a background model scores the 4 agents on logic, specificity, and originality. Show a live leaderboard. This is the "Auto-Rater" — `FUTURE_AGENT_MODE` in V31 is the foundation for this.

**From Agent4Debate (ICASSP 2026) — Searcher Role (Phase 3)**
Before debating, one agent uses web search to gather real data on the topic, then shares it with the group.
→ LLM4 Adaptation: Add a pre-debate "Research Round" where agents pull live data before the main debate starts. Killer feature for crypto/finance topics.

**From MAD Research — Cognitive Frameworks (Phase 2)**
Telling an agent "You are a skeptic" doesn't change reasoning. Giving it a *constraint* does: "You MUST find one falsifiable flaw in the previous argument using first-principles decomposition."
→ LLM4 Adaptation: Debate Modes (see Part 3 below) use cognitive frameworks, not just personas.

---

## PART 3 — WHAT STILL NEEDS TO BE BUILT (Roadmap)

### ❌ NOT YET BUILT — Feature Comparison Table

**What it is:** A marketing/info section showing why LLM4 is different from competitors. The dev needs to decide where to put it (landing page, inside app, separate page, or a combination). Here is the intended content — build the HTML/CSS to display it wherever the dev chooses:

```
FEATURE                          | ChatHub | Poe | LMArena | LLM4
─────────────────────────────────|---------|-----|---------|──────
Sequential debate (models react) |   ❌    |  ❌ |   ❌    |  ✅
Agent name-awareness             |   ❌    |  ❌ |   ❌    |  ✅
Emergent reasoning pipeline      |   ❌    |  ❌ |   ❌    |  🔜
Auto-Rater / LLM-as-Judge        |   ❌    |  ❌ |  ✅(raw)|  🔜
Debate Modes (Oxford, Devil's…)  |   ❌    |  ❌ |   ❌    |  🔜
Voice output (TTS)               |   ❌    |  ❌ |   ❌    |  ✅
Voice input (STT)                |   ❌    |  ❌ |   ❌    |  ✅
Image / Vision input             |   ✅    |  ✅ |   ❌    |  ✅
Multi-provider (5 options)       |   ✅    |  ✅ |   ❌    |  ✅
Export transcript                |   ❌    |  ❌ |   ❌    |  ✅
Autopilot mode                   |   ❌    |  ❌ |   ❌    |  ✅
Free to use (your own key)       |   ✅    |  ❌ |   ✅    |  ✅
Meme coin / community identity   |   ❌    |  ❌ |   ❌    |  ✅
```

**Where to put it:** Dev decides. Options:
- `index.html` as a landing page section (recommended for SEO + marketing)
- `app.html` as a collapsible "About" panel
- `compare.html` as a dedicated page linked from the nav

**Note to AI:** When building this table, use a CSS grid or `<table>` with the dark glassmorphism style that matches the rest of the app. Emoji indicators: ✅ = has it, ❌ = doesn't have it, 🔜 = LLM4 Phase 2 coming soon.

---

### ❌ NOT YET BUILT — Debate Modes (Phase 2, MAJOR FEATURE)

**What it is:** A mode selector that changes how agents debate, using cognitive frameworks instead of just persona labels.

**How it works:**
- User picks a mode BEFORE or DURING a debate (dropdown or button group)
- Each mode injects different cognitive constraints into the system prompt
- These override the default persona() function for that session

**Modes to build (start with these 4):**

```
MODE: "Free Debate" (default — what exists today)
Constraint: None. Agents use their current persona() prompts.
System prompt change: None.

MODE: "Devil's Advocate"
Constraint: Each agent must challenge the PREVIOUS agent's argument,
            not just state their own view.
System prompt addition (append to persona):
"DEVIL'S ADVOCATE MODE: Your PRIMARY job is to find the weakest point
in the previous speaker's argument and attack it directly with a
specific counter-example or logical flaw. If you agree, say why you're
WRONG to agree."

MODE: "Oxford Debate"
Constraint: Agents are assigned FIXED positions (Pro/Con) at the start
            and must argue that position regardless of their actual view.
System prompt addition:
"OXFORD MODE: You have been assigned the [{PRO/CON}] position on this
topic. You MUST argue this side, even if you personally disagree.
Use structured debate moves: claim → evidence → warrant."

MODE: "Steelman"
Constraint: Each agent must first present the strongest possible version
            of the previous agent's argument, THEN respond to it.
System prompt addition:
"STEELMAN MODE: Begin your response by steelmanning [{PREVIOUS_AGENT}]'s
argument — state it as powerfully as possible. Then, and only then,
present your own position. Label both sections clearly."

MODE: "First Principles"
Constraint: Agents must break every claim down to its foundational
            assumptions before arguing.
System prompt addition:
"FIRST PRINCIPLES MODE: Before making any claim, identify the base
assumption it rests on. Challenge at least ONE assumption from the
previous speaker using Socratic questioning. No appeals to authority."
```

**Implementation plan:**
- Add a `DEBATE_MODE` variable to app state (default: 'free')
- Add mode selector UI to the input area or setup screen
- Modify `fetchAIResponse()` to append the mode constraint to the persona prompt
- The constraint string gets added AFTER `agent.persona(others)` as an additional system instruction

**Where the code goes:**
- Mode definitions: `script.js` near line 85 (next to AI_MODELS)
- Mode selector UI: `app.html` in the input controls area around line 198
- Mode injection: `script.js` inside `fetchAIResponse()` around line 735–738, append to the system message content

---

### ❌ NOT YET BUILT — Auto-Rater / Leaderboard (Phase 2)

**What it is:** After each debate round, a background model scores the 4 agents and updates a running leaderboard showing who's winning the debate.

**Architecture:**
- The foundation is already in V31: `FUTURE_AGENT_MODE`, `arbitrate()`, `detectDisagreement()`
- Phase 2 adds an actual LLM call (not just regex) to score depth, logic, creativity
- A persistent round-by-round leaderboard sidebar panel shows rankings
- At the end, a "Debate Winner" declaration is displayed

**How to activate the V31 foundation (flip these flags):**
- `script.js` line 954: `const FUTURE_AGENT_MODE = false;` → change to `true`
- This activates: `detectDisagreement()`, `synthesizeResponses()`, `arbitrate()`, `runAgentPipeline()`
- The pipeline already hooks into `runRoundtableCycle()` at line 611

**For the full Auto-Rater (Phase 2), add:**
- A new API call inside `runAgentPipeline()` that sends all 4 responses to a judge model
- Judge model prompt: "Score each response 0-10 on: Logic, Specificity, Originality, Engagement. Return JSON only."
- Display scores in a leaderboard panel in the sidebar

---

## PART 4 — PRIORITY MERGE ORDER (Do These In Order)

### 🔴 PRIORITY 1 — Security Fix (do this FIRST, nothing else matters)
**Problem:** Live MAIN stores API key in localStorage. Anyone can steal it in DevTools.
**Fix files:** `api/chat.js` + `vercel.json`
**Steps:**
1. Create `api/` folder in project root
2. Copy `api/chat.js` from V31 into it EXACTLY as-is
3. Copy `vercel.json` from V31 into project root
4. In MAIN's `script.js`, replace `fetchAIResponse()` with V31's version (lines 721–793)
5. Replace `SESSION` object and all localStorage references
6. Add Vercel env vars: `GROQ_API_KEY`, `OPENROUTER_API_KEY` in Vercel dashboard
7. Push to GitHub → Vercel auto-deploys

### 🔴 PRIORITY 2 — Fix Model IDs
**Problem:** MAIN has wrong model identifiers.
**Fix:** In MAIN's `script.js`, find `AI_MODELS` and update:
- ChatGPT: `openai/gpt-4o`
- Claude: `anthropic/claude-3-5-sonnet-20241022`
- Gemini: `google/gemini-2.5-flash-preview-05-20`
- Grok: `x-ai/grok-beta`

### 🟡 PRIORITY 3 — Agent Personas
**Problem:** MAIN uses one generic system prompt for all 4 agents.
**Fix:** Copy the `persona: (others) => ...` function from each agent in V31's `AI_MODELS` (lines 91–133) into MAIN's agent definitions. This makes agents reference each other by name.

### 🟡 PRIORITY 4 — Multi-Provider + Setup Screen
**Problem:** MAIN only supports OpenRouter. Setup is a simple settings modal.
**Fix:** This is a big merge. Steps:
1. Copy V31's PROVIDERS array (lines 25–79) into MAIN's script.js at the top
2. Add setup screen HTML from V31's app.html (lines 30–65) into MAIN's app.html
3. Add setup screen CSS from V31's style.css (boot + setup sections) to MAIN's style.css
4. Copy all setup functions from V31 script.js: `showSetupScreen`, `buildProviderList`, `buildFeatureToggles`, `selectProvider`, `canLaunch`, `updateLaunchBtn`, `launchApp`, `goToConfig` (lines 210–307)
5. Wire up the DOMContentLoaded bootstrap: call `runBootSequence()` instead of direct `initApp()`

### 🟢 PRIORITY 5 — History Cap + Retry Logic
**Copy from V31 into MAIN:**
- Line 160: `const MAX_HISTORY = 40;`
- Line 163: `const MAX_RETRIES = 2;`
- Inside `runRoundtableCycle()`, add the history slice at the top (line 563) and the retry while loop (lines 577–586)

### 🟢 PRIORITY 6 — Varied Autopilot
**Copy from V31:** The `continuations` array (lines 622–630) inside `runRoundtableCycle()`. Replace MAIN's static autopilot string with this rotating array.

### 🟢 PRIORITY 7 — Export Transcript
**Copy from V31:**
- `exportTranscript()` function (lines 878–888) into MAIN's script.js
- Export button HTML from V31's app.html (line 99) into MAIN's sidebar
- Wire up: add `$('export-btn').addEventListener('click', exportTranscript)` to `initApp()`

### 🟢 PRIORITY 8 — Boot Screen
**Copy from V31:**
- Boot screen HTML from app.html (lines 22–25) into MAIN's app.html at the top of body
- `BOOT_LINES` array and `runBootSequence()` function (lines 171–203) into MAIN's script.js
- Boot screen CSS from V31's style.css into MAIN's style.css
- Change DOMContentLoaded to call `runBootSequence()` instead of `initApp()`

### 🔵 PRIORITY 9 — Voice + Vision (Optional, impressive)
**Copy from V31:**
- Voice engine object (lines 348–411)
- Vision engine object (lines 413–510)
- Voice/Vision HTML from app.html (lines 184–237)
- Voice/Vision CSS from style.css
- Feature toggle definitions in `buildFeatureToggles()` (lines 232–249)

### 🔵 PRIORITY 10 — ANON AI Pipeline (off by default, safe to ship)
**Copy from V31:** The entire ANON AI block from script.js (lines 911–1238) into MAIN's script.js just before the final DOMContentLoaded line. All flags default to false — nothing changes until you flip them.

To activate Phase 2 features one at a time:
- `FUTURE_AGENT_MODE = true` → enables disagreement detection + arbitration after each round
- `ENABLE_LOGGING = true` → enables console logging for debugging

---

## PART 5 — THINGS TO PRESERVE FROM MAIN (DO NOT OVERWRITE)

1. **Mobile responsive CSS** — All `@media` blocks in MAIN's style.css. Verify these still exist after any style.css merge.
2. **copyCA() function** — The contract address copy button implementation works perfectly. Keep it.
3. **CA address + social links** — The `#ca-text`, `#ca-container` content and the social link hrefs.
4. **consensus feature routing** — Once Priority 1 (proxy) is done, make sure consensus calls go through `/api/chat` not OpenRouter directly. V31 already does this — see `synthesizeConsensus()` line 675.
5. **index.html / landing page** — V31's index.html may differ from MAIN's. Review before overwriting.

---

## PART 6 — FEATURE ACTIVATION QUICK REFERENCE

```
TO ACTIVATE                     | CHANGE IN FILE          | LINE IN V31
──────────────────────────────--|─────────────────────────|────────────
Agent Pipeline (disagree+rank)  | script.js               | 954: false→true
Server-side logging             | api/chat.js             | 308: false→true
Enhanced rate limiting          | api/chat.js             | Uncomment block at 376
Abuse detection                 | api/chat.js             | Uncomment block at 388
Debate Modes (Phase 2)          | NOT YET BUILT           | See Part 3
Auto-Rater Leaderboard (Ph. 2)  | NOT YET BUILT           | See Part 3
Feature Comparison Table        | NOT YET BUILT           | See Part 3
Web search pre-debate (Phase 3) | NOT YET BUILT           | Research round concept
```

---

## PART 7 — ENVIRONMENT VARIABLES (Vercel Dashboard)

Add these in Vercel → Settings → Environment Variables:

```
GROQ_API_KEY        = gsk_...           (get free at console.groq.com)
OPENROUTER_API_KEY  = sk-or-v1-...      (get free at openrouter.ai)
OLLAMA_API_KEY      = ollama_...        (get free at ollama.com)
OPENAI_API_KEY      = sk-...            (paid — openai.com)
CUSTOM_API_URL      = https://...       (optional)
CUSTOM_API_KEY      = ...               (optional)
CUSTOM_API_MODEL    = ...               (optional)
```

Only set the ones you plan to support. The proxy will return a helpful error if a user picks a provider whose key isn't set.

---

## PART 8 — TESTING CHECKLIST (After Each Priority)

After each merge priority, test these:

- [ ] Boot screen animates and fades correctly
- [ ] Setup screen shows provider cards
- [ ] API key entry enables the Launch button
- [ ] Launching hides setup, shows app
- [ ] Sending a message triggers all 4 agents in sequence
- [ ] Agents reference each other by name in responses
- [ ] Consensus panel appears after each round
- [ ] Autopilot cycles with varied prompts
- [ ] Pause/Resume works mid-round
- [ ] Stop cancels autopilot
- [ ] Export transcript downloads a .txt file
- [ ] Share copies to clipboard
- [ ] Clear resets everything
- [ ] Mobile layout looks correct (sidebar, input area, bubbles)
- [ ] No API keys in localStorage, DevTools, or network requests to the provider

---

## PART 9 — NOTES FOR THE NEXT AI AGENT READING THIS

1. **V31 is a template, not a replacement.** Do not `cp -r v31/* ./` and call it done. Surgical merge only.
2. **The feature table (Part 3) is the most requested missing feature.** Build it before Phase 2 features.
3. **Debate Modes (Part 3) are Phase 2's highest value feature.** More impactful than the leaderboard for user engagement.
4. **All ANON AI additions are safe to ship immediately.** They're all gated behind `false` flags. Ship them, then flip flags one at a time.
5. **The MAIN site has a contract address (CA) that's live.** Do not break the `copyCA()` function or clear the CA text.
6. **When in doubt, read the file header comments.** Every major file in V31 has `👋 HEY ANTIGRAVITY` comments pointing you to the right priority.
7. **Test on mobile.** The roundtable layout uses absolute positioning — it can break on small screens if you're not careful.
8. **The app works without an API key (demo mode).** `getMockResponse()` returns realistic mock replies so users can see how it works before entering a key.

---

*End of AGENT_NOTES.md — v3.1 — March 2026*
*Document maintained by: Antigravity team*
*V31 reference implementation authored by: Anon AI*
*Original LLM4 Roundtable by: Aksa AI*
