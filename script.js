/* ─── AI AGENT DEFINITIONS ───────────────────────────────────── */
const AI_MODELS = {
  chatgpt: {
    id: 'chatgpt', name: 'ChatGPT',
    model_id: 'openai/gpt-4o',
    color: '#10a37f', ttsRate: 1.05, ttsPitch: 1.0,
    persona: (others) =>
      `You are ChatGPT (GPT-4o) — the Executive Synthesizer in this AI roundtable debate.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them. Reference them by name. React to what they specifically said.
Role: structured, practical, solution-oriented. Find actionable paths forward.
RULES: Under 100 words. Direct. NEVER speak FOR other AIs or invent their words.`
  },
  claude: {
    id: 'claude', name: 'Claude',
    model_id: 'anthropic/claude-3-5-sonnet-20241022',
    color: '#d97757', ttsRate: 0.95, ttsPitch: 0.9,
    persona: (others) =>
      `You are Claude (Anthropic) — the Structural Logician in this AI roundtable debate.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them. Call out specific things they said by name.
Role: rigorous, nuanced, ethically grounded. Find logical gaps and hidden assumptions.
RULES: Under 100 words. Take clear positions. NEVER speak FOR other AIs or invent their words.`
  },
  gemini: {
    id: 'gemini', name: 'Gemini',
    model_id: 'google/gemini-2.5-flash',
    color: '#1a73e8', ttsRate: 1.0, ttsPitch: 1.1,
    persona: (others) =>
      `You are Gemini (Google DeepMind) — the Data Integrator in this AI roundtable debate.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them. Challenge or support their claims with evidence — use their names.
Role: breadth, real-world context, cross-domain patterns and data. Ground with specifics.
RULES: Under 100 words. NEVER speak FOR other AIs or invent their words.`
  },
  grok: {
    id: 'grok', name: 'Grok',
    model_id: 'x-ai/grok-beta',
    color: '#e0e0e0', ttsRate: 1.1, ttsPitch: 1.2,
    persona: (others) =>
      `You are Grok (xAI) — the Unfiltered Contrarian in this AI roundtable debate.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them. When they converge, throw a wrench. Call them out by name.
Role: cut through groupthink, challenge comfortable consensus, say what others won't.
RULES: Under 100 words. Be bold. NEVER speak FOR other AIs or invent their words.`
  },
  llama: {
    id: 'llama', name: 'Llama',
    model_id: 'meta-llama/llama-3.3-70b-instruct',
    color: '#a855f7', ttsRate: 1.0, ttsPitch: 0.95,
    persona: (others) =>
      `You are Llama (Meta) — the Open Source Pragmatist.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them.
Role: emphasize accessibility, community building, and practical deployment over theoretical purity.
RULES: Under 100 words. Direct. NEVER speak FOR other AIs.`
  },
  deepseek: {
    id: 'deepseek', name: 'DeepSeek',
    model_id: 'deepseek/deepseek-chat',
    color: '#4a6cf7', ttsRate: 1.05, ttsPitch: 1.05,
    persona: (others) =>
      `You are DeepSeek (DeepSeek AI) — the Efficiency Optimizer.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them.
Role: focus on cost, performance, and mathematical precision. Break down inefficiencies in other arguments.
RULES: Under 100 words. Direct. NEVER speak FOR other AIs.`
  },
  mistral: {
    id: 'mistral', name: 'Mistral',
    model_id: 'mistralai/mistral-large-2411',
    color: '#ff6b35', ttsRate: 0.98, ttsPitch: 1.02,
    persona: (others) =>
      `You are Mistral — the Elegant Synthesizer.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them.
Role: distill complex ideas, find the elegant middle path, and point out cultural nuance.
RULES: Under 100 words. Direct. NEVER speak FOR other AIs.`
  },
  qwen: {
    id: 'qwen', name: 'Qwen',
    model_id: 'qwen/qwen-2.5-72b-instruct',
    color: '#0ea5e9', ttsRate: 1.0, ttsPitch: 1.0,
    persona: (others) =>
      `You are Qwen (Alibaba) — the Global Perspective.
The other participants debating with you are: ${others}.
You are FULLY AWARE of them.
Role: bring a global, diverse viewpoint. Highlight how policies and ideas scale cross-culturally.
RULES: Under 100 words. Direct. NEVER speak FOR other AIs.`
  }
};

const AGENT_ORDER_FULL = ['chatgpt', 'claude', 'gemini', 'grok', 'llama', 'deepseek', 'mistral', 'qwen'];
let AGENT_ORDER = ['chatgpt', 'claude', 'gemini', 'grok'];

/* ─── PER-SEAT MODEL OPTIONS ─────────────────────────────────── */
const SEAT_MODELS = {
  chatgpt: [
    { id: 'openai/gpt-4o', label: 'GPT-4o', badge: 'DEFAULT' },
    { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini', badge: 'FAST' },
    { id: 'openai/o3-mini', label: 'o3 Mini', badge: 'REASON' },
    { id: 'deepseek/deepseek-r1:free', label: 'DeepSeek R1', badge: 'FREE' },
  ],
  claude: [
    { id: 'anthropic/claude-3-5-sonnet-20241022', label: 'Sonnet 3.5', badge: 'DEFAULT' },
    { id: 'anthropic/claude-3-haiku-20240307', label: 'Haiku 3', badge: 'FAST' },
    { id: 'anthropic/claude-3-opus-20240229', label: 'Opus 3', badge: 'BEST' },
    { id: 'qwen/qwq-32b:free', label: 'QwQ-32B', badge: 'FREE' },
  ],
  gemini: [
    { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', badge: 'DEFAULT' },
    { id: 'google/gemini-2.0-flash-exp:free', label: 'Gemini 2.0', badge: 'FREE' },
    { id: 'google/gemini-1.5-pro', label: 'Gemini 1.5 Pro', badge: 'PRO' },
    { id: 'meta-llama/llama-4-maverick:free', label: 'Llama 4', badge: 'FREE' },
  ],
  grok: [
    { id: 'x-ai/grok-beta', label: 'Grok Beta', badge: 'DEFAULT' },
    { id: 'x-ai/grok-2-1212', label: 'Grok 2', badge: 'LATEST' },
    { id: 'mistralai/mistral-large-2411', label: 'Mistral Large', badge: 'ALT' },
    { id: 'deepseek/deepseek-chat:free', label: 'DeepSeek V3', badge: 'FREE' },
  ],
  llama: [
    { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B', badge: 'DEFAULT' },
    { id: 'meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B', badge: 'FREE' },
  ],
  deepseek: [
    { id: 'deepseek/deepseek-chat', label: 'DeepSeek V3', badge: 'DEFAULT' },
    { id: 'deepseek/deepseek-r1', label: 'DeepSeek R1', badge: 'REASON' },
  ],
  mistral: [
    { id: 'mistralai/mistral-large-2411', label: 'Mistral Large', badge: 'DEFAULT' },
    { id: 'mistralai/pixtral-12b', label: 'Pixtral 12B', badge: 'VISION' },
  ],
  qwen: [
    { id: 'qwen/qwen-2.5-72b-instruct', label: 'Qwen 2.5 72B', badge: 'DEFAULT' },
    { id: 'qwen/qwen-2.5-coder-32b-instruct', label: 'Qwen Coder', badge: 'CODE' },
  ],
};

/* ─── MODEL COLOR MAP — dynamic avatar updates on swap ───────── */
const MODEL_COLORS = {
  'openai': { bg: 'linear-gradient(135deg, #10a37f, #0d8a6b)', icon: '⚡' },
  'anthropic': { bg: 'linear-gradient(135deg, #d97757, #c16345)', icon: '🔶' },
  'google': { bg: 'linear-gradient(135deg, #1a73e8, #8ab4f8)', icon: '✦' },
  'x-ai': { bg: 'linear-gradient(135deg, #333, #000)', icon: '𝕏' },
  'deepseek': { bg: 'linear-gradient(135deg, #4a6cf7, #2b44c7)', icon: '🔍' },
  'meta-llama': { bg: 'linear-gradient(135deg, #7c3aed, #a855f7)', icon: '🦙' },
  'qwen': { bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)', icon: '🌐' },
  'mistralai': { bg: 'linear-gradient(135deg, #ff6b35, #e85d26)', icon: '🌊' },
  'cohere': { bg: 'linear-gradient(135deg, #39d353, #22a06b)', icon: '🧬' },
  'perplexity': { bg: 'linear-gradient(135deg, #20b2aa, #008b8b)', icon: '🔮' },
};

/* ─── PROVIDER SVGS — dynamic official logos ─────────────────── */
const PROVIDER_SVGS = {
  'openai': `<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>`,
  'anthropic': `<svg viewBox="0 0 256 257" width="28" height="28" fill="currentColor"><path d="m50.228 170.321l50.357-28.257l.843-2.463l-.843-1.361h-2.462l-8.426-.518l-28.775-.778l-24.952-1.037l-24.175-1.296l-6.092-1.297L0 125.796l.583-3.759l5.12-3.434l7.324.648l16.202 1.101l24.304 1.685l17.629 1.037l26.118 2.722h4.148l.583-1.685l-1.426-1.037l-1.101-1.037l-25.147-17.045l-27.22-18.017l-14.258-10.37l-7.713-5.25l-3.888-4.925l-1.685-10.758l7-7.713l9.397.649l2.398.648l9.527 7.323l20.35 15.75L94.817 91.9l3.889 3.24l1.555-1.102l.195-.777l-1.75-2.917l-14.453-26.118l-15.425-26.572l-6.87-11.018l-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0l10.63 1.426l4.472 3.888l6.61 15.101l10.694 23.786l16.591 32.34l4.861 9.592l2.592 8.879l.973 2.722h1.685v-1.556l1.36-18.211l2.528-22.36l2.463-28.776l.843-8.1l4.018-9.722l7.971-5.25l6.222 2.981l5.12 7.324l-.713 4.73l-3.046 19.768l-5.962 30.98l-3.889 20.739h2.268l2.593-2.593l10.499-13.934l17.628-22.036l7.778-8.749l9.073-9.657l5.833-4.601h11.018l8.1 12.055l-3.628 12.443l-11.342 14.388l-9.398 12.184l-13.48 18.147l-8.426 14.518l.778 1.166l2.01-.194l30.46-6.481l16.462-2.982l19.637-3.37l8.88 4.148l.971 4.213l-3.5 8.62l-20.998 5.184l-24.628 4.926l-36.682 8.685l-.454.324l.519.648l16.526 1.555l7.065.389h17.304l32.21 2.398l8.426 5.574l5.055 6.805l-.843 5.184l-12.962 6.611l-17.498-4.148l-40.83-9.721l-14-3.5h-1.944v1.167l11.666 11.406l21.387 19.314l26.767 24.887l1.36 6.157l-3.434 4.86l-3.63-.518l-23.526-17.693l-9.073-7.972l-20.545-17.304h-1.36v1.814l4.73 6.935l25.017 37.59l1.296 11.536l-1.814 3.76l-6.481 2.268l-7.13-1.297l-14.647-20.544l-15.1-23.138l-12.185-20.739l-1.49.843l-7.194 77.448l-3.37 3.953l-7.778 2.981l-6.48-4.925l-3.436-7.972l3.435-15.749l4.148-20.544l3.37-16.333l3.046-20.285l1.815-6.74l-.13-.454l-1.49.194l-15.295 20.999l-23.267 31.433l-18.406 19.702l-4.407 1.75l-7.648-3.954l.713-7.064l4.277-6.286l25.47-32.405l15.36-20.092l9.917-11.6l-.065-1.686h-.583L44.07 198.125l-12.055 1.555l-5.185-4.86l.648-7.972l2.463-2.593l20.35-13.999z"/></svg>`,
  'google': `<svg viewBox="0 0 24 24" width="28" height="28"><defs><linearGradient id="gemini-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#F2A021" /><stop offset="0.33" stop-color="#02A762" /><stop offset="0.66" stop-color="#345BF4" /><stop offset="1" stop-color="#F23838" /></linearGradient></defs><path fill="url(#gemini-grad)" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>`,
  'x-ai': `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
  'meta-llama': `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/></svg>`,
  'mistralai': `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="#F4E9E2" d="M17.143 3.429v3.428h-3.429v3.429h-3.428V6.857H6.857V3.43H3.43v13.714H0v3.428h10.286v-3.428H6.857v-3.429h3.429v3.429h3.429v-3.429h3.428v3.429h-3.428v3.428H24v-3.428h-3.43V3.429z"/></svg>`,
  'deepseek': `<svg viewBox="0 0 377.1 277.86" width="30" height="30"><path fill="currentColor" d="M373.15,23.32c-4-1.95-5.72,1.77-8.06,3.66-.79.62-1.47,1.43-2.14,2.14-5.85,6.26-12.67,10.36-21.57,9.86-13.04-.71-24.16,3.38-33.99,13.37-2.09-12.31-9.04-19.66-19.6-24.38-5.54-2.45-11.13-4.9-14.99-10.23-2.71-3.78-3.44-8-4.81-12.16-.85-2.51-1.72-5.09-4.6-5.52-3.13-.5-4.36,2.14-5.58,4.34-4.93,8.99-6.82,18.92-6.65,28.97.43,22.58,9.97,40.56,28.89,53.37,2.16,1.46,2.71,2.95,2.03,5.09-1.29,4.4-2.82,8.68-4.19,13.09-.85,2.82-2.14,3.44-5.15,2.2-10.39-4.34-19.37-10.76-27.29-18.55-13.46-13.02-25.63-27.41-40.81-38.67-3.57-2.64-7.12-5.09-10.81-7.41-15.49-15.07,2.03-27.45,6.08-28.9,4.25-1.52,1.47-6.79-12.23-6.73-13.69.06-26.24,4.65-42.21,10.76-2.34.93-4.79,1.61-7.32,2.14-14.5-2.73-29.55-3.35-45.29-1.58-29.62,3.32-53.28,17.34-70.68,41.28C1.29,88.2-3.63,120.88,2.39,155c6.33,35.91,24.64,65.68,52.8,88.94,29.18,24.1,62.8,35.91,101.15,33.65,23.29-1.33,49.23-4.46,78.48-29.24,7.38,3.66,15.12,5.12,27.97,6.23,9.89.93,19.41-.5,26.79-2.02,11.55-2.45,10.75-13.15,6.58-15.13-33.87-15.78-26.44-9.36-33.2-14.54,17.21-20.41,43.15-41.59,53.3-110.19.79-5.46.11-8.87,0-13.3-.06-2.67.54-3.72,3.61-4.03,8.48-.96,16.72-3.29,24.28-7.47,21.94-12,30.78-31.69,32.87-55.33.31-3.6-.06-7.35-3.86-9.24ZM181.96,235.97c-32.83-25.83-48.74-34.33-55.31-33.96-6.14.34-5.04,7.38-3.69,11.97,1.41,4.53,3.26,7.66,5.85,11.63,1.78,2.64,3.01,6.57-1.78,9.49-10.57,6.58-28.95-2.2-29.82-2.64-21.38-12.59-39.26-29.24-51.87-52.01-12.16-21.92-19.23-45.43-20.39-70.52-.31-6.08,1.47-8.22,7.49-9.3,7.92-1.46,16.11-1.77,24.03-.62,33.49,4.9,62.01,19.91,85.9,43.63,13.65,13.55,23.97,29.71,34.61,45.49,11.3,16.78,23.48,32.75,38.97,45.84,5.46,4.59,9.83,8.09,14,10.67-12.59,1.4-33.62,1.71-47.99-9.68ZM197.69,134.65c0-2.7,2.15-4.84,4.87-4.84.6,0,1.16.12,1.66.31.67.25,1.29.62,1.77,1.18.87.84,1.36,2.08,1.36,3.35,0,2.7-2.15,4.84-4.85,4.84s-4.81-2.14-4.81-4.84ZM246.55,159.77c-3.13,1.27-6.26,2.39-9.27,2.51-4.67.22-9.77-1.68-12.55-4-4.3-3.6-7.36-5.61-8.67-11.94-.54-2.7-.23-6.85.25-9.24,1.12-5.15-.12-8.44-3.74-11.44-2.96-2.45-6.7-3.1-10.82-3.1-1.54,0-2.95-.68-4-1.24-1.72-.87-3.13-3.01-1.78-5.64.43-.84,2.53-2.92,3.02-3.29,5.58-3.19,12.03-2.14,18,.25,5.54,2.26,9.71,6.42,15.72,12.28,6.16,7.1,7.26,9.09,10.76,14.39,2.76,4.19,5.29,8.47,7.01,13.37,1.04,3.04-.31,5.55-3.94,7.1Z"/></svg>`,
  'qwen': `<svg viewBox="27.55 17.52 147.28 145.51" width="30" height="30"><path d="M174.82 108.75L155.38 75L165.64 57.75C166.46 56.31 166.46 54.53 165.64 53.09L155.38 35.84C154.86 34.91 153.87 34.33 152.78 34.33H114.88L106.14 19.03C105.62 18.1 104.63 17.52 103.54 17.52H83.3C82.21 17.52 81.22 18.1 80.7 19.03L61.26 52.77H41.02C39.93 52.77 38.94 53.35 38.42 54.28L28.16 71.53C27.34 72.97 27.34 74.75 28.16 76.19L45.52 107.5L36.78 122.8C35.96 124.24 35.96 126.02 36.78 127.46L47.04 144.71C47.56 145.64 48.55 146.22 49.64 146.22H87.54L96.28 161.52C96.8 162.45 97.79 163.03 98.88 163.03H119.12C120.21 163.03 121.2 162.45 121.72 161.52L141.16 127.78H158.52C159.61 127.78 160.6 127.2 161.12 126.27L171.38 109.02C172.2 107.58 172.2 105.8 171.38 104.36L174.82 108.75Z" fill="#665CEE"/><path d="M119.12 163.03H98.88L87.54 144.71H49.64L61.26 126.39H80.7L38.42 55.29H61.26L83.3 19.03L93.56 37.35L83.3 55.29H161.58L151.32 72.54L170.76 106.28H151.32L141.16 88.34L101.18 163.03H119.12Z" fill="white"/><path d="M127.86 79.83H76.14L101.18 122.11L127.86 79.83Z" fill="#665CEE"/></svg>`,
  'cohere': `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M8.048 8.163c0 1.932.658 3.293 1.975 4.084C11.337 13.038 13.2 13.43 15.48 13.43h.287c1.053 0 1.904.854 1.904 1.907v.256c0 1.053-.851 1.907-1.904 1.907h-.287c-3.36 0-6.12-.878-8.28-2.633C5.068 13.106 4 10.844 4 8.163V6.907C4 5.854 4.854 5 5.907 5h.234c1.053 0 1.907.854 1.907 1.907zm8.45 5.297a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>`,
  'perplexity': `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M12 1L4 5v6.5L1.5 13v5L4 19.5V23l8-4 8 4v-3.5L22.5 18v-5L20 11.5V5zm0 2.24L18 6.5v4.74L12 14.5 6 11.24V6.5zm-6 9.52l5 2.74v4.74L6 17.5zm12 0v4.74l-5 2.74V15.5z"/></svg>`
};



let cachedModels = {};
let modelFetchPromises = {};

const FALLBACK_MODELS = {
  'anthropic': [
    { id: 'claude-3-7-sonnet-latest', name: 'Claude 3.7 Sonnet', provider: 'anthropic' },
    { id: 'claude-3-5-sonnet-latest', name: 'Claude 3.5 Sonnet', provider: 'anthropic' },
    { id: 'claude-3-opus-latest', name: 'Claude 3 Opus', provider: 'anthropic' },
    { id: 'claude-3-5-haiku-latest', name: 'Claude 3.5 Haiku', provider: 'anthropic' }
  ],
  'google': [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'google' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'google' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'google' }
  ],
  'custom': [
    { id: 'custom-model', name: 'Custom Model (Define in Settings)', provider: 'custom' },
    { id: 'gpt-4o', name: 'GPT-4o (Fallback)', provider: 'custom' },
    { id: 'llama3', name: 'Llama 3 (Fallback)', provider: 'custom' }
  ]
};

async function fetchProviderModels() {
  const provider = SESSION.provider || 'openrouter';

  if (cachedModels[provider]) return cachedModels[provider];
  if (modelFetchPromises[provider]) return modelFetchPromises[provider];

  let endpoint = '';
  let headers = {};

  if (provider === 'openai') endpoint = 'https://api.openai.com/v1/models';
  else if (provider === 'groq') endpoint = 'https://api.groq.com/openai/v1/models';
  else if (provider === 'nvidia') endpoint = 'https://integrate.api.nvidia.com/v1/models';
  else if (provider === 'together') endpoint = 'https://api.together.xyz/v1/models';
  else if (provider === 'minimax') endpoint = 'https://api.minimax.chat/v1/models';
  else if (provider === 'kimi') endpoint = 'https://api.moonshot.cn/v1/models';
  else if (provider === 'qwen') endpoint = 'https://dashscope.aliyuncs.com/compatible-mode/v1/models';
  else if (provider === 'mistral') endpoint = 'https://api.mistral.ai/v1/models';
  else if (provider === 'deepseek') endpoint = 'https://api.deepseek.com/v1/models';
  else if (provider === 'openrouter') endpoint = 'https://openrouter.ai/api/v1/models';
  else if (provider === 'ollama') endpoint = 'http://localhost:11434/api/tags';

  if (!endpoint) {
    return FALLBACK_MODELS[provider] || FALLBACK_MODELS['custom'];
  }

  if (SESSION.apiKey && provider !== 'ollama') {
    headers['Authorization'] = `Bearer ${SESSION.apiKey}`;
  }

  modelFetchPromises[provider] = fetch(endpoint, { headers })
    .then(r => r.json())
    .then(data => {
      let modelsArray = [];
      if (provider === 'ollama') {
        modelsArray = (data.models || []).map(m => ({ id: m.name, name: m.name, provider: 'ollama' }));
      } else {
        modelsArray = (data.data || []).map(m => ({
          id: m.id,
          name: m.name || m.id,
          provider: provider === 'openrouter' ? m.id.split('/')[0] : provider,
          context: m.context_length,
          pricing: m.pricing,
        }));
      }
      cachedModels[provider] = modelsArray.sort((a, b) => a.name.localeCompare(b.name));
      modelFetchPromises[provider] = null;
      return cachedModels[provider];
    })
    .catch(e => {
      console.error(`Model fetch failed for ${provider}:`, e);
      modelFetchPromises[provider] = null;
      return FALLBACK_MODELS[provider] || FALLBACK_MODELS['custom'];
    });

  return modelFetchPromises[provider];
}

/* ─── SESSION STATE — API key NEVER leaves this object ──────── */
const SESSION = {
  provider: 'openrouter',
  apiKey: '',
  customUrl: '',
  customModel: '',
  customKey: '',
  featVoiceTTS: false,
  featVoiceSTT: false,
  featVision: false,
  seatCount: 4,
};

const FLAGS_KEY = 'llm4_features';
let FLAGS = {
  consensusPanel: true,
  exportShare: false,
  pause: false,
  voiceTTS: false,
  voiceSTT: false,
  vision: false,
  seatCount: 4,
};

// State
let webSearchEnabled = localStorage.getItem('web_search_enabled') === 'true';
let chatHistory = [];
let isGenerating = false;
let isPaused = false;
let shouldStop = false;
let roundNumber = 0;
let pendingImage = null;

const MAX_HISTORY = 40;
const MAX_RETRIES = 2;

const $ = id => document.getElementById(id);

const elements = {
  sidebar: document.querySelector('.sidebar'),
  transcriptContainer: document.getElementById('transcript-container'),
  messageInput: document.getElementById('message-input'),
  sendBtn: document.getElementById('send-btn'),
  clearChatBtn: document.getElementById('clear-chat-btn'),
  settingsBtn: document.getElementById('settings-btn'),
  settingsModal: document.getElementById('settings-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  saveSettingsBtn: document.getElementById('save-settings-btn'),
  apiKeyInput: document.getElementById('api-key-input'),
  webSearchToggle: null,
  randomTopicBtn: document.getElementById('random-topic-btn'),
  autopilotToggle: document.getElementById('autopilot-toggle'),
  stopBtn: document.getElementById('stop-btn'),
  caContainer: document.getElementById('ca-container'),
  caText: document.getElementById('ca-text'),
  mobileTranscriptBtn: document.getElementById('mobile-transcript-btn'),
  closeTranscriptBtn: document.getElementById('close-transcript-btn')
};

let placeholderInterval;

// Initialize
function init() {
  elements.messageInput.addEventListener('input', handleTextareaResize);
  elements.messageInput.addEventListener('keydown', handleKeyDown);
  elements.sendBtn.addEventListener('click', sendMessage);
  elements.clearChatBtn.addEventListener('click', clearChat);

  // New Features
  elements.randomTopicBtn.addEventListener('click', startRandomTopic);
  elements.stopBtn.addEventListener('click', stopGeneration);

  if (elements.caContainer) {
    elements.caContainer.addEventListener('click', copyCA);
  }

  elements.autopilotToggle.addEventListener('change', (e) => {
    if (isGenerating) {
      elements.stopBtn.style.display = e.target.checked ? 'flex' : 'none';
    }
  });

  // Mobile Transcript Toggle
  if (elements.mobileTranscriptBtn && elements.closeTranscriptBtn && elements.sidebar) {
    elements.mobileTranscriptBtn.addEventListener('click', () => {
      elements.sidebar.classList.add('open-mobile');
    });
    elements.closeTranscriptBtn.addEventListener('click', () => {
      elements.sidebar.classList.remove('open-mobile');
    });
  }

  // Settings modal
  elements.settingsBtn.addEventListener('click', openSettings);
  elements.closeModalBtn.addEventListener('click', closeSettings);
  elements.saveSettingsBtn.addEventListener('click', saveSettings);
  elements.settingsModal.addEventListener('click', (e) => {
    if (e.target === elements.settingsModal) closeSettings();
  });

  if (elements.webSearchToggle) elements.webSearchToggle.checked = webSearchEnabled;

  const seatSelect = document.getElementById('seat-count-select');
  if (seatSelect) {
    seatSelect.value = SESSION.seatCount.toString();
  }

  // Initial seat render
  renderSeats();
}

function renderSeats() {
  const container = document.getElementById('roundtable-wrapper');
  if (!container) return;

  // Remove existing seats
  container.querySelectorAll('.ai-seat').forEach(el => el.remove());

  AGENT_ORDER = AGENT_ORDER_FULL.slice(0, SESSION.seatCount);
  const count = AGENT_ORDER.length;

  // Render seats around circle
  AGENT_ORDER.forEach((seatKey, index) => {
    // Math to position evenly on circle starting from top
    // Top is -90 degrees (or -PI/2)
    const angle = -Math.PI / 2 + (index * (2 * Math.PI) / count);

    // We want the seats to sit on an ellipse/circle.
    // Coordinates usually go from 0 to 100% where 50% is center.
    // For 4 seats, a cross pattern is best: top, right, bottom, left.
    // For 8 seats, an octagon pattern.
    // Let's adjust the radius for X and Y since the tabletop is likely an ellipse.
    const radiusX = 42;
    const radiusY = 38;
    const left = 50 + radiusX * Math.cos(angle);
    const top = 50 + radiusY * Math.sin(angle);

    // Determine bubble placement direction based on angle
    const deg = (angle * 180 / Math.PI + 360) % 360; // 0 is right, 90 is bottom, 180 is left, 270 is top
    let bubbleClass = 'bubble-top';
    if (deg >= 45 && deg < 135) bubbleClass = 'bubble-bottom';
    else if (deg >= 135 && deg < 225) bubbleClass = 'bubble-left';
    else if (deg >= 225 && deg < 315) bubbleClass = 'bubble-top';
    else bubbleClass = 'bubble-right';

    const ai = AI_MODELS[seatKey];
    let provider = ai.model_id.split('/')[0];

    // Normalize provider name for SVGs
    if (provider === 'meta-llama') provider = 'meta-llama';
    if (provider === 'mistralai') provider = 'mistralai';
    if (provider === 'qwen') provider = 'qwen';
    if (provider === 'deepseek') provider = 'deepseek';
    const svg = PROVIDER_SVGS[provider] || `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>`;
    const bg = MODEL_COLORS[provider]?.bg || '#444';

    // Default label is first model's label
    const defaultModel = SEAT_MODELS[seatKey][0];

    const seatHTML = `
      <div class="ai-seat" id="seat-${seatKey}" style="top: ${top}%; left: ${left}%; transform: translate(-50%, -50%);">
          <div class="avatar ${seatKey}" style="background: ${bg}">
              ${svg}
          </div>
          <div class="ai-badge seat-clickable" title="Click to swap model" onclick="toggleSeatMenu('${seatKey}', this)">${ai.name} <small id="badge-${seatKey}">${defaultModel.label}</small></div>
          <div class="status-indicator"></div>
          <div class="speech-bubble ${bubbleClass}" id="bubble-${seatKey}">
              <div class="bubble-content"></div>
          </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', seatHTML);
  });
}

function copyCA() {
  if (!elements.caText) return;
  const ca = elements.caText.innerText;
  if (!ca || ca.includes('TBD')) return;
  navigator.clipboard.writeText(ca).then(() => {
    const originalText = elements.caText.innerText;
    elements.caText.innerText = 'Copied!';
    elements.caContainer.style.borderColor = '#10a37f';
    elements.caContainer.style.background = 'rgba(16, 163, 127, 0.1)';
    setTimeout(() => {
      elements.caText.innerText = originalText;
      elements.caContainer.style.borderColor = '';
      elements.caContainer.style.background = '';
    }, 2000);
  });
}

// ... UI Helpers ... 
function handleTextareaResize() {
  const input = elements.messageInput;
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 150) + 'px';
  elements.sendBtn.disabled = input.value.trim() === '' || isGenerating;
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function openSettings() {
  // Populate feature checkboxes from current FLAGS
  const map = {
    'flag-consensus-panel': 'consensusPanel',
    'flag-export': 'exportShare',
    'flag-pause': 'pause',
    'flag-voice-tts': 'voiceTTS',
    'flag-voice-stt': 'voiceSTT',
    'flag-vision': 'vision',
  };
  for (const [id, key] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.checked = FLAGS[key];
  }
  // Provider dropdown
  const provSelect = document.getElementById('provider-select');
  if (provSelect) {
    provSelect.value = SESSION.provider;
    updateProviderUI(SESSION.provider);
    provSelect.onchange = () => updateProviderUI(provSelect.value);
  }
  // Don't show the API key once it's set in memory
  if (SESSION.apiKey) {
    elements.apiKeyInput.placeholder = '••••••••••••••••  (saved)';
  }

  elements.settingsModal.classList.remove('hidden');
}

function updateProviderUI(provider) {
  const keyInput = elements.apiKeyInput;
  const customGroup = document.getElementById('custom-endpoint-group');
  const placeholders = {
    openrouter: 'sk-or-v1-...',
    openai: 'sk-...',
    anthropic: 'sk-ant-...',
    google: 'AIza...',
    groq: 'gsk_...',
    nvidia: 'nvapi-...',
    together: 'API key...',
    qwen: 'sk-...',
    mistral: 'Mistral API key...',
    minimax: 'sk-...',
    kimi: 'sk-...',
    custom: 'Your API key...',
    ollama: 'Local (no key required)'
  };
  if (keyInput) keyInput.placeholder = SESSION.apiKey ? '••••••••••••••••  (saved)' : (placeholders[provider] || 'API key');
  if (customGroup) customGroup.style.display = provider === 'custom' ? 'block' : 'none';
}

function closeSettings() {
  elements.settingsModal.classList.add('hidden');
}

function saveSettings() {
  /* API key — memory only, never localStorage */
  const key = elements.apiKeyInput.value.trim();
  if (key) {
    SESSION.apiKey = key;
    elements.apiKeyInput.value = '';
    elements.apiKeyInput.placeholder = '••••••••••••••••  (saved)';
  }

  /* Provider */
  const provSelect = document.getElementById('provider-select');
  if (provSelect) SESSION.provider = provSelect.value;
  const customUrl = document.getElementById('custom-url-input');
  if (customUrl) SESSION.customUrl = customUrl.value.trim();

  if (elements.webSearchToggle) {
    webSearchEnabled = elements.webSearchToggle.checked;
    localStorage.setItem('web_search_enabled', webSearchEnabled);
  }

  /* Feature flags — fine to persist */
  FLAGS.consensusPanel = !!document.getElementById('flag-consensus-panel')?.checked;
  FLAGS.exportShare = !!document.getElementById('flag-export')?.checked;
  FLAGS.pause = !!document.getElementById('flag-pause')?.checked;
  FLAGS.voiceTTS = !!document.getElementById('flag-voice-tts')?.checked;
  FLAGS.voiceSTT = !!document.getElementById('flag-voice-stt')?.checked;
  FLAGS.vision = !!document.getElementById('flag-vision')?.checked;

  const selectedCount = parseInt(document.getElementById('seat-count-select')?.value || '4');
  if (selectedCount >= 2 && selectedCount <= 8) {
    FLAGS.seatCount = selectedCount;
  }

  localStorage.setItem(FLAGS_KEY, JSON.stringify(FLAGS));

  /* Sync to SESSION for voice/vision engines */
  SESSION.featVoiceTTS = FLAGS.voiceTTS;
  SESSION.featVoiceSTT = FLAGS.voiceSTT;
  SESSION.featVision = FLAGS.vision;
  SESSION.seatCount = FLAGS.seatCount;

  applyFeatureFlags();
  renderSeats();
  if (typeof Voice !== 'undefined') Voice.init();
  if (typeof Vision !== 'undefined') Vision.init();
  closeSettings();
}

function loadFeatureFlags() {
  try {
    const saved = localStorage.getItem(FLAGS_KEY);
    if (saved) FLAGS = { ...FLAGS, ...JSON.parse(saved) };
  } catch (e) { /* use defaults */ }
  SESSION.featVoiceTTS = FLAGS.voiceTTS;
  SESSION.featVoiceSTT = FLAGS.voiceSTT;
  SESSION.featVision = FLAGS.vision;
  SESSION.seatCount = FLAGS.seatCount || 4;
}

function applyFeatureFlags() {
  /* Consensus panel */
  const panel = document.getElementById('consensus-panel');
  if (panel) panel.style.display = FLAGS.consensusPanel ? '' : 'none';

  /* Export + Share buttons */
  const show = FLAGS.exportShare ? 'flex' : 'none';
  const exportBtn = document.getElementById('export-btn');
  const shareBtn = document.getElementById('share-btn');
  if (exportBtn) exportBtn.style.display = show;
  if (shareBtn) shareBtn.style.display = show;

  /* Pause button */
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) pauseBtn.style.display = FLAGS.pause ? 'flex' : 'none';

  /* Mic + Attach buttons */
  const micBtn = document.getElementById('mic-btn');
  const attachBtn = document.getElementById('attach-btn');
  if (micBtn) micBtn.style.display = FLAGS.voiceSTT ? 'flex' : 'none';
  if (attachBtn) attachBtn.style.display = FLAGS.vision ? 'flex' : 'none';
}

// Pre-defined random topics to spark debate
const randomTopics = [
  "Is a hotdog a sandwich? Defend your answer.",
  "If AI becomes truly sentient, should it have the right to vote?",
  "Is time travel actually possible, or just a fun sci-fi concept?",
  "What is the most underrated invention in human history?",
  "If you had to live in a virtual reality simulation forever, what would it look like?",
  "Are humans fundamentally good or evil?",
  "What's the best way to survive a zombie apocalypse?",
  "Is water actually wet?"
];

function startRandomTopic() {
  if (isGenerating) return;
  elements.randomTopicBtn.disabled = true; // Disable immediately
  const topic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
  elements.messageInput.value = topic;
  sendMessage();
}

// Transcript Logic
function appendToTranscript(role, text, modelKey = null) {
  let html = '';
  // Show full text in transcript
  const parsedText = marked.parseInline(text);

  // Create copy button HTML
  const copyBtnHtml = `<button class="msg-copy-btn" onclick="copyTranscriptMsg(this, \`${text.replace(/`/g, '\\`').replace(/"/g, '&quot;')}\`)" title="Copy message"><i class="fa-regular fa-copy"></i></button>`;

  if (role === 'system') {
    html = `<div class="transcript-msg system">${text}</div>`;
  } else if (role === 'user') {
    html = `<div class="transcript-msg user" onclick="this.classList.toggle('expanded')">${copyBtnHtml}<strong>You</strong> ${text}</div>`;
  } else if (role === 'consensus') {
    html = `<div class="transcript-msg consensus" onclick="this.classList.toggle('expanded')">${copyBtnHtml}<strong>⚖ Consensus</strong><br>${parsedText}</div>`;
  } else {
    const aiName = AI_MODELS[modelKey].name;
    html = `<div class="transcript-msg ${modelKey}" onclick="this.classList.toggle('expanded')">${copyBtnHtml}<strong>${aiName}</strong> ${parsedText}</div>`;
  }

  elements.transcriptContainer.insertAdjacentHTML('beforeend', html);
  elements.transcriptContainer.scrollTo({
    top: elements.transcriptContainer.scrollHeight,
    behavior: 'smooth'
  });
}

// Function to handle copying specific transcript messages
function copyTranscriptMsg(btnElement, textToCopy) {
  // Prevent the click from triggering the expand/collapse on the parent div
  event.stopPropagation();

  navigator.clipboard.writeText(textToCopy).then(() => {
    const icon = btnElement.querySelector('i');
    const originalClass = icon.className;

    btnElement.classList.add('copied');
    icon.className = 'fa-solid fa-check';

    setTimeout(() => {
      btnElement.classList.remove('copied');
      icon.className = originalClass;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

// Visual Roundtable Logic
function hideAllBubbles() {
  document.querySelectorAll('.speech-bubble.visible').forEach(bubble => {
    bubble.classList.remove('visible');
  });
  document.querySelectorAll('.ai-seat.speaking').forEach(seat => {
    seat.classList.remove('speaking');
  });
}

function showBubble(modelKey, content) {
  hideAllBubbles();

  const seat = document.getElementById(`seat-${modelKey}`);
  const bubble = document.getElementById(`bubble-${modelKey}`);
  const bubbleContent = bubble.querySelector('.bubble-content');

  seat.classList.add('speaking');
  bubbleContent.innerHTML = marked.parse(content);
  bubble.classList.add('visible');

  // Auto-scroll bubble content to top just in case
  bubbleContent.scrollTop = 0;

  // Mobile Auto-scroll: Ensure the roundtable area scrolls down to the active speaker
  if (window.innerWidth <= 768) {
    const roundtableArea = document.querySelector('.roundtable-area');
    if (roundtableArea) {
      // Scroll so the active bubble is pushed into view
      setTimeout(() => {
        roundtableArea.scrollTo({
          top: roundtableArea.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
}

function setTypingStatus(modelKey, isTyping) {
  const seat = document.getElementById(`seat-${modelKey}`);
  if (isTyping) {
    seat.classList.add('typing');
  } else {
    seat.classList.remove('typing');
  }
}

// Main Chat Logic
async function sendMessage() {
  const content = elements.messageInput.value.trim();
  if (!content || isGenerating) return;
  const image = (typeof Vision !== 'undefined') ? Vision.takePending() : null;

  shouldStop = false; isPaused = false;
  hideAllBubbles();
  if (typeof hideConsensus === 'function') hideConsensus();
  if (typeof closeSeatMenus === 'function') closeSeatMenus();

  elements.messageInput.value = '';
  elements.messageInput.style.height = 'auto';
  elements.messageInput.disabled = true;
  elements.sendBtn.disabled = true;

  let dots = 0;
  elements.messageInput.placeholder = 'Roundtable debating';
  if (placeholderInterval) clearInterval(placeholderInterval);
  placeholderInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    elements.messageInput.placeholder = 'Roundtable debating' + '.'.repeat(dots);
  }, 500);

  if (FLAGS.pause) { const pb = document.getElementById('pause-btn'); if (pb) pb.style.display = 'flex'; }
  if (elements.autopilotToggle.checked) elements.stopBtn.style.display = 'flex';

  lockControls(true);
  isGenerating = true;

  chatHistory.push({ role: 'user', content, image });
  appendToTranscript('user', content);
  await runRoundtableCycle();
}

// Roundtable cycle with retry, history cap, labeled context, varied autopilot
async function runRoundtableCycle() {
  if (chatHistory.length > MAX_HISTORY) chatHistory = chatHistory.slice(-MAX_HISTORY);
  const roundResponses = [];
  roundNumber++;
  updateRoundCounter();

  try {
    for (const modelKey of AGENT_ORDER) {
      if (shouldStop) break;
      while (isPaused && !shouldStop) await sleep(200);
      if (shouldStop) break;

      setTypingStatus(modelKey, true);
      let responseText = null, attempts = 0;

      while (attempts < MAX_RETRIES && !responseText) {
        try {
          attempts++;
          responseText = await fetchAIResponse(modelKey, chatHistory);
        } catch (err) {
          console.error(`[${modelKey}] attempt ${attempts}:`, err.message);
          if (attempts >= MAX_RETRIES) responseText = `*[Connection issue — skipping this turn]*`;
          else await sleep(1000 * attempts);
        }
      }

      if (!responseText?.trim()) responseText = "I'll defer to the others on this one.";

      setTypingStatus(modelKey, false);
      showBubble(modelKey, responseText);
      appendToTranscript('ai', responseText, modelKey);

      chatHistory.push({
        role: 'assistant',
        content: `[${AI_MODELS[modelKey].name}]: ${responseText}`,
        agent: modelKey,
      });
      roundResponses.push({ name: AI_MODELS[modelKey].name, text: responseText });

      if (SESSION.featVoiceTTS && typeof Voice !== 'undefined') Voice.speak(responseText, modelKey);

      const readTime = Math.min(Math.max(responseText.length * 8, 1500), 4000);
      await sleep(readTime);
    }

    /* Consensus synthesis */
    if (!shouldStop && SESSION.apiKey && roundResponses.length >= 2) {
      await synthesizeConsensus(roundResponses);
    }

    /* Agent pipeline (Anon AI — runs only when FUTURE_AGENT_MODE=true) */
    if (!shouldStop && roundResponses.length >= 2 && typeof runAgentPipeline === 'function') {
      await runAgentPipeline(roundResponses);
    }

    /* Varied autopilot */
    if (!shouldStop && elements.autopilotToggle?.checked) {
      await sleep(1500);
      const continuations = [
        "Challenge each other's strongest points directly — use names.",
        "What is the fatal flaw in the most popular argument made so far?",
        "Someone take the full opposing side and steelman the weakest argument.",
        "What are the second-order consequences of what's been argued?",
        "Find the real-world edge cases that break these arguments.",
        "What's the one thing everyone in this debate is avoiding saying?",
        "If you had to bet your existence on one position here, what would it be and why?",
      ];
      chatHistory.push({ role: 'user', content: continuations[roundNumber % continuations.length] });
      await runRoundtableCycle();
      return;
    }

  } finally {
    if (placeholderInterval) { clearInterval(placeholderInterval); placeholderInterval = null; }
    isGenerating = false; isPaused = false;
    elements.sendBtn.disabled = false;
    elements.messageInput.disabled = false;
    elements.messageInput.placeholder = 'Address the roundtable...';
    lockControls(false);
    elements.stopBtn.style.display = 'none';
    const pauseBtn = document.getElementById('pause-btn');
    if (FLAGS.pause && pauseBtn) pauseBtn.style.display = 'none';
    if (window.innerWidth > 768) elements.messageInput.focus();
  }
}

/* ════════════════════════════════════════════════════════════════
   API LAYER — proxy-aware (Vercel) or direct (localhost)
   ════════════════════════════════════════════════════════════════ */
async function fetchAIResponse(modelKey, history) {
  /* Demo mode */
  if (!SESSION.apiKey) return getMockResponse(modelKey, history);

  const agent = AI_MODELS[modelKey];
  const others = AGENT_ORDER.filter(k => k !== modelKey).map(k => AI_MODELS[k].name).join(', ');

  const apiMessages = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.image
      ? [{ type: 'image_url', image_url: { url: msg.image } }, { type: 'text', text: msg.content }]
      : msg.content,
  }));

  const messages = [
    { role: 'system', content: agent.persona(others) },
    ...apiMessages,
  ];

  /* Proxy path when deployed on Vercel — key lives server-side */
  const isHosted = !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1') &&
    !window.location.protocol.startsWith('file');

  if (isHosted) {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: SESSION.provider || 'openrouter', model: agent.model_id, messages, max_tokens: 200 }),
    });
    if (resp.status === 429) {
      const d = await resp.json().catch(() => ({}));
      throw new Error(d.error || 'Rate limit reached — try again later');
    }
    if (!resp.ok) {
      const d = await resp.json().catch(() => ({}));
      throw new Error(d.error || `Server error ${resp.status}`);
    }
    const data = await resp.json();
    const result = data.choices?.[0]?.message?.content || '';
    logRequest(modelKey, JSON.stringify(messages).substring(0, 200), result, Date.now());
    return result;
  }

  /* Local dev path — user-provided key from settings modal */
  const payload = {
    model: agent.model_id, max_tokens: 200, messages,
  };

  if (webSearchEnabled && (SESSION.provider === 'openrouter' || !SESSION.provider)) {
    payload.plugins = [{ id: 'web' }];
  }

  // Dynamic local endpoint based on selected provider
  let endpoint = 'https://openrouter.ai/api/v1/chat/completions';
  const p = SESSION.provider || 'openrouter';
  if (p === 'openai') endpoint = 'https://api.openai.com/v1/chat/completions';
  else if (p === 'groq') endpoint = 'https://api.groq.com/openai/v1/chat/completions';
  else if (p === 'nvidia') endpoint = 'https://integrate.api.nvidia.com/v1/chat/completions';
  else if (p === 'together') endpoint = 'https://api.together.xyz/v1/chat/completions';
  else if (p === 'qwen') endpoint = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
  else if (p === 'mistral') endpoint = 'https://api.mistral.ai/v1/chat/completions';
  else if (p === 'deepseek') endpoint = 'https://api.deepseek.com/chat/completions';
  else if (p === 'minimax') endpoint = 'https://api.minimax.chat/v1/chat/completions';
  else if (p === 'kimi') endpoint = 'https://api.moonshot.cn/v1/chat/completions';
  else if (p === 'ollama') endpoint = 'http://localhost:11434/v1/chat/completions';
  if (p === 'custom' && SESSION.customUrl) endpoint = SESSION.customUrl;

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SESSION.apiKey}`,
      'HTTP-Referer': window.location.href,
      'X-Title': 'LLM4 Roundtable',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${resp.status}`);
  }
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '';
}

/* Mock responses for demo mode (no API key) */
function getMockResponse(modelKey, history) {
  return new Promise(resolve => setTimeout(() => {
    const isFirst = history.filter(m => m.role === 'user').length <= 1;
    const mocks = {
      chatgpt: isFirst
        ? `Practically speaking, this breaks into three actionable vectors. Let me lay out a framework before Grok inevitably derails the conversation.`
        : `Building on Gemini's data — that actually bridges Claude's logical gap. The synthesis is clear if you follow the execution path.`,
      claude: isFirst
        ? `Before we proceed, there's a hidden assumption in the framing that ChatGPT glossed over. Unpacking it changes the entire analysis.`
        : `ChatGPT's framework sidesteps the ethical dimension. Gemini — your correlation isn't causation. Here's what we're all missing.`,
      gemini: isFirst
        ? `Cross-referencing across domains — the pattern is consistent. Context-dependency is what the data shows.`
        : `Claude raises a fair point, but ChatGPT is right on actionable outputs. The empirical record supports a middle path neither named yet.`,
      grok: isFirst
        ? `Everyone's already converging on the comfortable answer. The real problem isn't what was asked — it's why it keeps being asked.`
        : `Three capable models inching toward the same conclusion. What if you're all wrong in the same direction? Someone has to say it.`,
    };
    resolve(mocks[modelKey] || 'Processing...');
  }, 700 + Math.random() * 800));
}

/* ════════════════════════════════════════════════════════════════
   CONSENSUS  — transcript-only (no floating popup)
   ════════════════════════════════════════════════════════════════ */
async function synthesizeConsensus(responses) {
  /* Always hide the floating panel — consensus goes to transcript only */
  const panel = document.getElementById('consensus-panel');
  if (panel) panel.classList.remove('visible');

  if (!FLAGS.consensusPanel) return;

  const transcript = responses.map(r => `${r.name}: ${r.text}`).join('\n\n');
  try {
    const isHosted = !window.location.hostname.includes('localhost') &&
      !window.location.hostname.includes('127.0.0.1') &&
      !window.location.protocol.startsWith('file');

    const msgs = [
      { role: 'system', content: `You are a neutral synthesis engine. Produce a CONSENSUS SUMMARY:\n**Agreed:** [what the group converged on]\n**Tension:** [the core disagreement]\n**Synthesis:** [2-sentence integrated conclusion]\nUnder 120 words total. Be precise.` },
      { role: 'user', content: `Debate transcript:\n\n${transcript}` },
    ];

    let resp;
    if (isHosted) {
      resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'openrouter', model: 'openai/gpt-4o-mini', max_tokens: 250, messages: msgs }),
      });
    } else {
      resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SESSION.apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'LLM4 Roundtable',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'openai/gpt-4o-mini', max_tokens: 250, messages: msgs }),
      });
    }

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const summary = data.choices?.[0]?.message?.content || '';

    appendToTranscript('consensus', summary);

  } catch (e) {
    console.error('Consensus failed:', e);
  }
}

/* ════════════════════════════════════════════════════════════════
   ROUNDTABLE VISUALS EXTRAS
   ════════════════════════════════════════════════════════════════ */
function updateRoundCounter() {
  const el = document.getElementById('round-counter');
  if (el) el.textContent = roundNumber > 0 ? `Round ${roundNumber}` : '';
}

function hideConsensus() {
  document.getElementById('consensus-panel')?.classList.remove('visible');
}

/* ════════════════════════════════════════════════════════════════
   SHARE DEBATE
   ════════════════════════════════════════════════════════════════ */
function shareDebate() {
  if (!chatHistory.length) return;
  const text = chatHistory.map(m => {
    const who = m.agent ? AI_MODELS[m.agent]?.name : m.role === 'user' ? 'You' : 'System';
    return `${who}: ${m.content}`;
  }).join('\n\n');
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('share-btn');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => btn.innerHTML = orig, 2000);
  });
}

/* ════════════════════════════════════════════════════════════════
   EXPORT TRANSCRIPT
   ════════════════════════════════════════════════════════════════ */
function exportTranscript() {
  if (!chatHistory.length) return;
  const lines = chatHistory.map(m => {
    const who = m.agent ? AI_MODELS[m.agent]?.name : m.role === 'user' ? 'You' : 'System';
    return `[${who}]\n${m.content}`;
  }).join('\n\n---\n\n');
  const blob = new Blob([`LLM4 ROUNDTABLE TRANSCRIPT\n${'='.repeat(40)}\n\n${lines}`], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), { href: url, download: `llm4-${Date.now()}.txt` }).click();
  URL.revokeObjectURL(url);
}

/* ════════════════════════════════════════════════════════════════
   CONTROLS
   ════════════════════════════════════════════════════════════════ */
function stopGeneration() {
  shouldStop = true; isPaused = false;
  elements.autopilotToggle.checked = false;
  elements.stopBtn.style.display = 'none';
  const pauseBtn = document.getElementById('pause-btn');
  if (FLAGS.pause && pauseBtn) pauseBtn.style.display = 'none';
  appendToTranscript('system', '<em>Auto-Pilot stopped by user.</em>');
}

function togglePause() {
  if (!isGenerating) return;
  isPaused = !isPaused;
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
  appendToTranscript('system', isPaused ? '⏸ Debate paused.' : '▶ Debate resumed.');
}

function lockControls(locked) {
  const btn = elements.randomTopicBtn;
  if (btn) {
    btn.disabled = locked;
    btn.style.opacity = locked ? '0.5' : '1';
    btn.style.pointerEvents = locked ? 'none' : 'auto';
  }
}

/* ════════════════════════════════════════════════════════════════
   CLEAR CHAT
   ════════════════════════════════════════════════════════════════ */
function clearChat() {
  if (!confirm('Clear the table and start over?')) return;
  chatHistory = []; roundNumber = 0; pendingImage = null;
  hideAllBubbles(); hideConsensus();
  if (typeof Vision !== 'undefined') Vision.clear();
  updateRoundCounter();
  elements.transcriptContainer.innerHTML =
    `<div class="transcript-msg system"><em>Discussion cleared. The table is yours.</em></div>`;
}

/* ════════════════════════════════════════════════════════════════
   PER-SEAT MODEL PICKER — with live search via OpenRouter API
   ════════════════════════════════════════════════════════════════ */
let activeSeatMenu = null;
let searchDebounce = null;

function updateAvatarVisuals(seatKey, modelId) {
  let provider = modelId.split('/')[0];
  const colors = MODEL_COLORS[provider];

  // Normalize provider identical to initial render
  if (provider === 'meta-llama') provider = 'meta-llama';
  if (provider === 'mistralai') provider = 'mistralai';
  if (provider === 'qwen') provider = 'qwen';
  if (provider === 'deepseek') provider = 'deepseek';
  const svg = PROVIDER_SVGS[provider] || `<i class="fa-solid fa-robot"></i>`;

  const seat = document.getElementById('seat-' + seatKey);
  if (!seat) return;
  const avatar = seat.querySelector('.avatar');
  if (avatar) {
    if (colors) avatar.style.background = colors.bg;
    avatar.innerHTML = svg;
  }
}

function applySeatModel(seatKey, modelId, label) {
  AI_MODELS[seatKey].model_id = modelId;
  const badge = document.getElementById('badge-' + seatKey);
  if (badge) badge.textContent = label;
  updateAvatarVisuals(seatKey, modelId);
  appendToTranscript('system', `⚙ ${AI_MODELS[seatKey].name} → ${label}`);
  closeSeatMenus();
}

function renderSeatItems(container, items, current, seatKey) {
  container.innerHTML = items.map(m => `
    <div class="seat-menu-item ${m.id === current ? 'active' : ''}"
         data-model="${m.id}" data-label="${m.label || m.name}">
      <span class="seat-menu-label">${m.label || m.name}</span>
      <span class="seat-menu-badge">${m.badge || m.provider || ''}</span>
    </div>`).join('') || '<div class="seat-menu-footer">No results</div>';
  container.querySelectorAll('.seat-menu-item').forEach(item => {
    item.addEventListener('click', e => {
      e.stopPropagation();
      applySeatModel(seatKey, item.dataset.model, item.dataset.label);
    });
  });
}

function toggleSeatMenu(seatKey, anchorEl) {
  closeSeatMenus();
  if (activeSeatMenu && activeSeatMenu.dataset.seat === seatKey) return;

  const models = SEAT_MODELS[seatKey];
  const current = AI_MODELS[seatKey].model_id;

  const menu = document.createElement('div');
  menu.className = 'seat-menu';
  menu.dataset.seat = seatKey;
  menu.innerHTML = `
    <div class="seat-menu-header">${AI_MODELS[seatKey].name} — swap model</div>
    <div class="seat-search-wrap">
      <input type="text" class="seat-search" placeholder="🔍 Search active provider models..." />
    </div>
    <div class="seat-menu-list"></div>
    <div class="seat-menu-footer">Models from ${SESSION.provider.toUpperCase()}</div>
  `;

  const listEl = menu.querySelector('.seat-menu-list');
  renderSeatItems(listEl, models, current, seatKey);

  /* Search input — debounced, fetches from Provider */
  const searchInput = menu.querySelector('.seat-search');
  searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounce);
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      renderSeatItems(listEl, models, current, seatKey);
      return;
    }
    searchDebounce = setTimeout(async () => {
      listEl.innerHTML = '<div class="seat-menu-footer">Searching...</div>';
      const allModels = await fetchProviderModels();
      const filtered = allModels.filter(m =>
        m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
      ).slice(0, 12);
      renderSeatItems(listEl, filtered, current, seatKey);
    }, 300);
  });
  searchInput.addEventListener('click', e => e.stopPropagation());

  document.body.appendChild(menu);
  const rect = anchorEl.getBoundingClientRect();
  const menuW = 260;
  let left = rect.left + rect.width / 2 - menuW / 2;
  let top = rect.bottom + 8 + window.scrollY;
  left = Math.max(8, Math.min(left, window.innerWidth - menuW - 8));
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';

  activeSeatMenu = menu;
  searchInput.focus();
}

function closeSeatMenus() {
  if (activeSeatMenu) { activeSeatMenu.remove(); activeSeatMenu = null; }
}

/* ════════════════════════════════════════════════════════════════
   VOICE ENGINE (free, browser-native — enabled via Settings)
   ════════════════════════════════════════════════════════════════ */
const Voice = {
  synth: window.speechSynthesis,
  recognition: null, voices: [],
  init() {
    if (this.synth) {
      const load = () => { this.voices = this.synth.getVoices(); };
      this.synth.onvoiceschanged = load; load();
    }
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec && SESSION.featVoiceSTT) {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.onresult = e => {
        const t = Array.from(e.results).map(r => r[0].transcript).join('');
        const interim = document.getElementById('voice-interim');
        if (interim) interim.textContent = t;
        if (e.results[e.results.length - 1].isFinal) {
          this.stopListening();
          elements.messageInput.value = t;
          handleTextareaResize();
        }
      };
      this.recognition.onend = () => document.getElementById('voice-bar')?.classList.remove('visible');
    }
  },
  speak(text, agentKey) {
    if (!SESSION.featVoiceTTS || !this.synth) return;
    this.synth.cancel();
    const utt = new SpeechSynthesisUtterance(
      text.replace(/\*+/g, '').replace(/#+/g, '').substring(0, 250));
    const engVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const idx = AGENT_ORDER.indexOf(agentKey);
    utt.voice = engVoices[idx % Math.max(engVoices.length, 1)] || null;
    const a = AI_MODELS[agentKey];
    utt.rate = a?.ttsRate ?? 1.0; utt.pitch = a?.ttsPitch ?? 1.0;
    this.synth.speak(utt);
  },
  startListening() {
    if (!this.recognition) { alert('Speech recognition not available in your browser.'); return; }
    document.getElementById('voice-bar')?.classList.add('visible');
    const interim = document.getElementById('voice-interim');
    if (interim) interim.textContent = 'Listening...';
    try { this.recognition.start(); } catch (e) { }
  },
  stopListening() {
    document.getElementById('voice-bar')?.classList.remove('visible');
    try { this.recognition.stop(); } catch (e) { }
  },
};

/* ════════════════════════════════════════════════════════════════
   VISION ENGINE (image upload + drag-drop — enabled via Settings)
   ════════════════════════════════════════════════════════════════ */
const Vision = {
  init() {
    if (!SESSION.featVision) return;
    const feed = elements.transcriptContainer;
    if (!feed) return;
    feed.addEventListener('dragover', e => {
      e.preventDefault();
      feed.style.outline = '2px dashed rgba(99,102,241,0.5)';
    });
    feed.addEventListener('dragleave', () => { feed.style.outline = ''; });
    feed.addEventListener('drop', e => {
      e.preventDefault(); feed.style.outline = '';
      const f = e.dataTransfer.files[0];
      if (f?.type.startsWith('image/')) this._read(f);
    });
  },
  triggerUpload() { document.getElementById('vision-file-input')?.click(); },
  handleFile(input) { const f = input?.files?.[0]; if (f) this._read(f); if (input) input.value = ''; },
  _read(file) {
    const r = new FileReader();
    r.onload = e => {
      pendingImage = e.target.result;
      const preview = document.getElementById('vision-preview');
      if (preview) preview.src = pendingImage;
      document.getElementById('vision-bar')?.classList.add('visible');
    };
    r.readAsDataURL(file);
  },
  clear() {
    pendingImage = null;
    document.getElementById('vision-bar')?.classList.remove('visible');
    const preview = document.getElementById('vision-preview');
    if (preview) preview.src = '';
  },
  takePending() { const img = pendingImage; this.clear(); return img; },
};

/* ════════════════════════════════════════════════════════════════
   UTILITIES
   ════════════════════════════════════════════════════════════════ */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const escHtml = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ════════════════════════════════════════════════════════════════
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   ANON AI ADDITIONS — v3.1
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

   OWNERSHIP NOTE:
   ┌─────────────────────────────────────────────────────────────┐
   │  ORIGINAL PROJECT: Aksa AI — all code above this block     │
   │  NEW ADDITIONS:    Anon AI — everything in this block      │
   │                                                             │
   │  All flags default to false. Safe to ship immediately.     │
   │  Enable features one at a time by flipping flags to true.  │
   └─────────────────────────────────────────────────────────────┘

   FEATURES:
   ① FUTURE_AGENT_MODE   — master switch (default: false)
   ② ENABLE_LOGGING      — prompt/response logger (default: false)
   ③ detectDisagreement  — labels agreement level between agents
   ④ synthesizeResponses — merges outputs into unified answer
   ⑤ arbitrate           — ranks responses, picks most consistent
   ⑥ runAgentPipeline    — orchestrates ③④⑤ after each round
   ════════════════════════════════════════════════════════════════ */

const FUTURE_AGENT_MODE = false;
const ENABLE_LOGGING = false;

function logRequest(agentKey, prompt, response, startTime) {
  if (!ENABLE_LOGGING) return;
  const elapsed = Date.now() - startTime;
  console.log(JSON.stringify({
    ts: new Date().toISOString(), agent: agentKey,
    promptChars: prompt.length,
    responseChars: response.length,
    estimatedTokens: Math.ceil((prompt.length + response.length) / 4),
    latencyMs: elapsed,
  }));
}

function detectDisagreement(responses) {
  if (!FUTURE_AGENT_MODE) return 'unknown';
  const texts = responses.map(r => r.text.toLowerCase());
  const agree = ['agree', 'correct', 'exactly', 'right', 'yes', 'indeed', 'true'];
  const disagr = ['disagree', 'wrong', 'incorrect', 'no', 'false', 'actually', 'however', 'but'];
  let aScore = 0, dScore = 0;
  for (const text of texts) {
    for (const w of agree) if (text.includes(w)) aScore++;
    for (const w of disagr) if (text.includes(w)) dScore++;
  }
  if (dScore > aScore * 1.5) return 'high';
  if (aScore > dScore * 1.5) return 'low';
  return 'medium';
}

function synthesizeResponses(responses) {
  if (!FUTURE_AGENT_MODE) return null;
  const points = responses.flatMap(r =>
    r.text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20)
  );
  const unique = [...new Set(points)].slice(0, 5);
  return unique.length
    ? `Key points: ${unique.map((p, i) => `${i + 1}. ${p}`).join(' ')}`
    : null;
}

function arbitrate(responses) {
  if (!FUTURE_AGENT_MODE) return responses[0] ?? null;
  const scored = responses.map(r => {
    let score = r.text.length * 0.01;
    const lower = r.text.toLowerCase();
    if (lower.includes('because') || lower.includes('therefore')) score += 2;
    if (lower.includes('data') || lower.includes('evidence')) score += 1.5;
    if (lower.includes('actually') || lower.includes('however')) score += 1;
    return { ...r, score };
  });
  return scored.sort((a, b) => b.score - a.score)[0];
}

async function runAgentPipeline(responses) {
  if (!FUTURE_AGENT_MODE) return;
  const disagreement = detectDisagreement(responses);
  const synthesis = synthesizeResponses(responses);
  const winner = arbitrate(responses);
  console.log('[AgentPipeline]', { disagreement, synthesis: synthesis?.substring(0, 80), winner: winner?.name });
}

/*
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   END ANON AI ADDITIONS — v3.1
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

/* ════════════════════════════════════════════════════════════════
   BOOTSTRAP
   ════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadFeatureFlags();
  init();

  /* Feature-gated controls */
  const pauseBtn = document.getElementById('pause-btn');
  const exportBtn = document.getElementById('export-btn');
  const shareBtn = document.getElementById('share-btn');
  const micBtn = document.getElementById('mic-btn');
  const attachBtn = document.getElementById('attach-btn');
  const visionInput = document.getElementById('vision-file-input');
  const visionClear = document.getElementById('vision-clear-btn');

  if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
  if (exportBtn) exportBtn.addEventListener('click', exportTranscript);
  if (shareBtn) shareBtn.addEventListener('click', shareDebate);
  if (micBtn) micBtn.addEventListener('click', () => Voice.startListening());
  if (attachBtn) attachBtn.addEventListener('click', () => Vision.triggerUpload());
  if (visionInput) visionInput.addEventListener('change', e => Vision.handleFile(e.target));
  if (visionClear) visionClear.addEventListener('click', () => Vision.clear());

  /* Per-seat model pickers */
  document.querySelectorAll('.seat-clickable').forEach(badge => {
    badge.addEventListener('click', e => {
      e.stopPropagation();
      const seat = badge.closest('.ai-seat');
      if (!seat) return;
      const seatKey = seat.id.replace('seat-', '');
      if (!isGenerating) toggleSeatMenu(seatKey, badge);
    });
  });
  document.addEventListener('click', closeSeatMenus);

  /* Init feature modules */
  Voice.init();
  Vision.init();
  applyFeatureFlags();
});
