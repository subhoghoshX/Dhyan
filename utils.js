const browser = chrome;

export function getSiteName(host) {
  if(host.includes("youtube.com"))
    return 'youtube';
  else if(host.includes("google.com"))
    return 'google';
  else if(host.includes("twitter.com"))
    return 'twitter';
  else if(host.includes("discord.com"))
    return 'discord';
}

export function insertCSS(files, tabId) {
  return browser.scripting.insertCSS({
    files,
    target: {
      tabId,
    }
  });
}

export function removeCSS(files, tabId) {
  return browser.scripting.removeCSS({
    files,
    target: {
      tabId,
    }
  });
}
