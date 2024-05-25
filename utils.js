const browser = chrome;

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
