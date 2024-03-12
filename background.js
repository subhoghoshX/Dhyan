import { youtube, google, twitter, discord } from "./css-to-apply.js";

const browser = chrome;

browser.webNavigation.onCommitted.addListener((details) => {
  const host = new URL(details.url).host;
  const tabId = details.tabId;

  function applyCSS(site) {
    for (const section in site){
      browser.scripting.insertCSS({
        css: site[section],
        target: {
          tabId,
        }
      });
    }
  }

  if(host.includes("youtube.com"))
      applyCSS(youtube);
  else if(host.includes("google.com"))
      applyCSS(google);
  else if(host.includes("twitter.com"))
      applyCSS(twitter);
  else if(host.includes("discord.com"))
      applyCSS(discord);
})
