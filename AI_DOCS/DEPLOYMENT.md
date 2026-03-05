# LLM4 Roundtable v3.0 — Vercel Deployment Guide

## 🛑 CRITICAL: Migrating to the Organization Account

**MESSAGE TO VICTOR:** 
To fix the merging issues and allow the AI to automatically handle deployments for you via the GitHub Org Skill, you must move the Vercel project and domain from your personal account to the JustSolDev Organization account.

Here is the exact step-by-step process to do this without any downtime:

### Step 1: Transfer the Vercel Project
1. Log in to your personal Vercel dashboard: `vercel.com/dashboard`
2. Select the `LLM4Ultra` project.
3. Go to **Settings** -> **Advanced**.
4. Scroll down to **Transfer Project**.
5. Enter the organization name (`JustSolDev`) and initiate the transfer.

### Step 2: Transfer the Domain (If Registered on Vercel)
If the domain `llm4.xyz` was purchased via Vercel:
1. In your personal Vercel dashboard, click on the **Domains** tab at the top.
2. Find `llm4.xyz`, click the three dots (`...`), and select **Transfer**.
3. Transfer it to the `JustSolDev` organization.

### Step 3: Re-link the GitHub Repository
Once the project is in the Org account, you must link it to the central repository so the AI can deploy it:
1. Go to the transferred project in the Vercel Org dashboard.
2. Go to **Settings** -> **Git**.
3. Under "Connected Git Repository", click **Disconnect** (to remove your personal repo).
4. Click **Connect Git Repository** and select the official org repo: `JustSolDev/LLM4-Roundtable`.

### Step 4: Re-add API Keys
Environment Variables do not transfer for security reasons.
1. In the transferred project, go to **Settings** -> **Environment Variables**.
2. Re-add all your API keys (`OPENROUTER_API_KEY`, `GROQ_API_KEY`, etc.) as described below.

---

## 🌍 How to Make the App Public (Use Your Server Keys for Everyone)

By default, the UI requires everyone to enter their own API key. If you want the public to use your website and consume your Vercel server keys automatically (without being prompted for a key), simply do this:

1. Open `script.js`
2. Find the `SESSION` state object (around line 250)
3. Change the `apiKey` from `''` to `'public'`

```javascript
/* ─── SESSION STATE ──────── */
const SESSION = {
  provider: 'openrouter',
  apiKey: 'public', // <--- Change this line!
  // ...
};
```

**Why this works:** The frontend now thinks it has a key, so it won't block the user. It sends the request to the `/api/chat` Vercel proxy. The Vercel proxy simply ignores the "public" key and securely attaches your real Environment Variable key before fetching from the AI provider.

> [!WARNING]
> Before you make it public, read **Step 3 and Step 4** below to configure **Rate Limiting** and set an **OpenRouter Spend Cap** so you don't go broke!

---

## How The Security Works

Your API keys NEVER touch the browser. Ever.

```
User → /api/chat (your Vercel server) → OpenRouter/Groq/etc
         ↑ key lives HERE only
         in Vercel Environment Variables
         invisible to everyone
```

## Step 1 — Add Your API Keys to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add whichever keys you have (you don't need all of them):

| Variable Name       | Where to get it              |
|---------------------|------------------------------|
| `GROQ_API_KEY`      | console.groq.com (FREE)      |
| `OPENROUTER_API_KEY`| openrouter.ai (FREE tier)    |
| `OLLAMA_API_KEY`    | ollama.com (FREE)            |
| `OPENAI_API_KEY`    | platform.openai.com (PAID)   |
| `CUSTOM_API_URL`    | Your custom endpoint URL     |
| `CUSTOM_API_MODEL`  | Your custom model name       |
| `CUSTOM_API_KEY`    | Your custom API key          |

4. Set each one to **Production** + **Preview** environments
5. Click **Save**

## Step 2 — Deploy

Push these files to your GitHub repo. Vercel auto-deploys.

```bash
git add .
git commit -m "v3.0 — proxy, security, all features"
git push
```

Done. The site is live and the keys are safe.

## Step 3 — Configure Rate Limiting

Open `api/chat.js` and change these two lines at the top:

```javascript
const MAX_REQUESTS_PER_HOUR  = 20;   // per IP — change this
const MAX_TOKENS_PER_REQUEST = 300;  // per API call — change this
```

20 requests/hour is a good starting point for a meme coin launch.
Lower it if you're worried about cost. Raise it if real users are hitting the limit.

## Step 4 — Set a Spend Cap on OpenRouter

Even with rate limiting, set a hard cap:
1. openrouter.ai → Settings → Billing
2. Set a daily spend limit (e.g. $5/day)
3. Even if someone bypasses rate limiting — bill is capped

## What Happens When Someone Tries To Abuse It

- They hit the rate limit → get a clear error message → blocked for the hour
- They try to inspect network traffic → they see calls to `/api/chat` with NO key in the request
- They try to steal the key from source code → it's not there — it's in Vercel's servers
- They try to call `/api/chat` directly from their own script → rate limited per their IP

## File Structure

```
your-repo/
├── api/
│   └── chat.js          ← Proxy server (key lives here as env var)
├── app.html             ← Main app
├── script.js            ← Frontend (calls /api/chat, not OpenRouter directly)
├── style.css            ← Styles
├── vercel.json          ← Routing config
├── index.html           ← Landing page
└── logo.png / logo_3d.png
```
