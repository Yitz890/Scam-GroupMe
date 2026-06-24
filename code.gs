
// ======================================================
//  GROUPME CHAOS BOT (1-MINUTE INTERVAL)
// ======================================================

const ACCESS_TOKEN = "replace with your access token";
const TARGET_GROUP = "replace with your group id to spam";

// ======================================================
//  API FUNCTIONS
// ======================================================

function sendMessage(msg) {
  const url = `https://api.groupme.com/v3/groups/${TARGET_GROUP}/messages`;
  const payload = {
    message: { source_guid: Utilities.getUuid(), text: msg }
  };

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: { "X-Access-Token": ACCESS_TOKEN },
    payload: JSON.stringify(payload)
  });
}

function changeNickname(newNickname) {
  const url = `https://api.groupme.com/v3/groups/${TARGET_GROUP}/memberships/update`;
  const payload = { membership: { nickname: newNickname } };
  
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: { "X-Access-Token": ACCESS_TOKEN },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

// ======================================================
//  RANDOM GENERATORS
// ======================================================

function explodeEmojis() {
  const emojis = ["😡","🤬","😤","📣","📢","🗣️","💀","🔥","🤯","🙄","😩","😵‍💫","🚨","⚠️","👿","😱","🤡","🧨","💣","📛","🔊"];
  let out = "";
  // Increased count for maximum annoyance
  const count = Math.floor(Math.random() * 15) + 10;
  for (let i = 0; i < count; i++) out += emojis[Math.floor(Math.random() * emojis.length)];
  return out;
}

function randomNickname() {
  const prefixes = ["🤖", "😈", "🔥", "💀", "👾", "🎭", "⚡", "🌀", "🌪️", "🎪"];
  const names = ["NOISY", "SPAM", "CHAOS", "GLITCH", "ERROR", "LOUD", "BOOM", "CRASH", "FAIL", "BUG"];
  // Randomizing the number to force the nickname to always be "new"
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${names[Math.floor(Math.random() * names.length)]}${Math.floor(Math.random() * 9999)}`;
}

// ======================================================
//  MAIN CHAOS LOOP — RUNS NICKNAME CHANGE + MESSAGE
// ======================================================

function chaosLoop() {
  // 1. Immediately change nickname
  changeNickname(randomNickname());
  
  // 2. Immediately send a chaotic, annoying message
  const annoyingMessages = [
    "I AM EVERYWHERE " + explodeEmojis(),
    "STOP ME IF YOU CAN " + explodeEmojis(),
    "SYSTEM OVERLOAD " + explodeEmojis(),
    "WHY IS THIS HAPPENING? " + explodeEmojis(),
    "NULL EXCEPTION DETECTED " + explodeEmojis()
  ];
  
  sendMessage(annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)]);
}

// ======================================================
//  TRIGGER SETUP
// ======================================================

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  // Set to run every 1 minute
  ScriptApp.newTrigger("chaosLoop")
    .timeBased()
    .everyMinutes(1)
    .create();
    
  console.log("Trigger set: Name change and spam message will occur every 1 minute.");
}
