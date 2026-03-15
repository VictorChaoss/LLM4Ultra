# Future Trading APIs for LLM4

This document outlines powerful trading and memecoin APIs that can be integrated into the LLM4 Roundtable to give the AI agents live, on-chain intelligence.

## 1. RugCheck (Solana Token Safety)
Instead of the bots just *guessing* if a coin is a rug pull based on market cap, we can hit a security API automatically to check the smart contract.
- **Functionality:** Scans tokens for malicious code (like freeze authority, mint authority, or locked/unlocked liquidity) and returns a "Good" or "Danger" score.
- **Pricing:** Free Tier available. Endpoints (like `/tokens/scan/{chain}/{contractAddress}`) are openly accessible for developers building integration projects without a paywall right now. Custom enterprise/high-volume agreements are required if hitting their servers with thousands of rapid requests per minute.

## 2. LunarCrush (Social Sentiment)
- **Functionality:** Tracks social volume. It could tell the bots: *"This token is currently the #1 most talked about coin on Twitter today."*
- **Free Tier (API v4):** 500 API requests per day. No credit card required. Provides basic access to real-time social data, creator metrics, and market signals.
- **Paid Tiers:**
  - **Pay-as-you-go:** Starts at $1/day (gives you 2,000 requests per day). Extra credits are $0.0005 each.
  - **Individual Plan:** $5/day (up to 10 requests/minute, 2,000 daily requests).
  - **Builder Plan:** $15/day (up to 100 requests/minute, 20,000 daily requests).
  - **Scale Plan:** $45/day (up to 500 requests/minute, 100,000 daily requests).

## 3. Helius RPC (Whale Watching & Chain Data)
- **Functionality:** Allows for tracking what specific wallets have been buying/selling in the last 24 hours. The AIs could then "roast" or "praise" a user's portfolio.
- **Free Tier:** 1,000,000 credits per month. 10 requests per second. Includes WebSockets, Webhooks, and LaserStream gRPC.
- **Paid Tiers:**
  - **Developer Plan ($49/month):** 10 million credits per month and 50 requests per second.
  - **Business/Professional Plans:** For massive scale, adding enhanced WebSockets and priority support.

## 4. Alternative.me (Crypto Fear & Greed Index)
- **Functionality:** Returns the current market sentiment score (0-100, Extreme Fear to Extreme Greed). We could inject this into the bots' system prompt every day so they know if the market is panicking or overly euphoric.
- **Pricing:** Completely free API. 

## 5. Jupiter (Jup.ag) Price API
- **Functionality:** Fetches the exact, to-the-second swap price and slippage routes for any Solana token.
- **Pricing:** Free, no keys required.

## 6. Birdeye API
- **Functionality:** Can pull the "Top 10 Trending Tokens in the last hour" and feed them automatically into a roundtable debate as a prompt!
- **Pricing:** Free tier available.

## 7. CoinGecko API
- **Functionality:** The gold standard for historical charts, top gainers, top losers, and overarching category data (e.g., "AI Coins" vs "Meme Coins").
- **Pricing:** Demo/Free Tier available.
