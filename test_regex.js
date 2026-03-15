const AGENT_ORDER = ['chatgpt', 'claude', 'gemini', 'grok'];
const AI_MODELS = {
    chatgpt: { name: 'ChatGPT' },
    claude: { name: 'Claude' },
    gemini: { name: 'Gemini' },
    grok: { name: 'Grok' }
};

function highlightMentions(html) {
  if (!html) return html;
  
  // Highlight explicit @ tags if user typed them
  let highlighted = html.replace(/(^|[^a-zA-Z0-9_])@([a-zA-Z0-9_-]+)/g, '$1<span class="a2a-mention">@$2</span>');
  
  // Also highlight natural names for active bots
  AGENT_ORDER.forEach(modelKey => {
    const name = AI_MODELS[modelKey].name;
    // Don't replace if it's already inside a span or tag
    const nameRegex = new RegExp(`(?<!<[^>]*)(\\b${name}\\b)(?![^<]*>)`, 'gi');
    highlighted = highlighted.replace(nameRegex, '<span class="a2a-mention">$1</span>');
  });
  
  return highlighted;
}

console.log(highlightMentions("I think Claude and Gemini are right."));
console.log(highlightMentions("I agree with <a href='claude'>Claude</a>."));

