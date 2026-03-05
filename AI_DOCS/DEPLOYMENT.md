# LLM4 Roundtable v3.0 — Vercel Deployment Guide

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
