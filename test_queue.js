const AGENT_ORDER = ['chatgpt', 'claude', 'gemini', 'grok'];

function detectMentions(text) {
  const mentions = [];
  const lowerText = String(text).toLowerCase();
  AGENT_ORDER.forEach(modelKey => {
    if (lowerText.includes(`@${modelKey}`)) {
      if (!mentions.includes(modelKey)) mentions.push(modelKey);
    }
  });
  return mentions;
}

function testRound1() {
    let chatHistory = [{ content: "Start" }];
    console.log("=== Round 1 ===");
    const lastMsg = chatHistory[chatHistory.length - 1]?.content || "";
    let queue = detectMentions(lastMsg);
    
    AGENT_ORDER.forEach(k => { if (!queue.includes(k)) queue.push(k); });
    console.log("Initial Queue:", queue);
    
    let loopCount = 0;
    const MAX_AUTO_LOOPS = AGENT_ORDER.length;
    const spokenThisRound = new Set(); 

    while (queue.length > 0) {
      if (loopCount >= MAX_AUTO_LOOPS) break;
      
      const modelKey = queue[0];
      if (spokenThisRound.has(modelKey)) {
          queue.shift();
          continue;
      }
      
      queue.shift();
      loopCount++;
      spokenThisRound.add(modelKey);
      
      console.log(`Speaker ${loopCount}: ${modelKey}`);
      
      let nextMentions = [];
      if (modelKey === 'chatgpt') {
         nextMentions = detectMentions("@gemini you go");
      }
      
      [...nextMentions].reverse().forEach(mention => {
        if (AGENT_ORDER.includes(mention) && !spokenThisRound.has(mention)) {
          const existingIdx = queue.indexOf(mention);
          if (existingIdx !== -1) queue.splice(existingIdx, 1);
          queue.unshift(mention);
          console.log(` -> ${mention} jumped to front. New queue:`, queue);
        }
      });
    }
}

testRound1();
