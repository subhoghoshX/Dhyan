import siteInfos from "./css-to-apply.js";
import { insertCSS, removeCSS } from "./utils.js";

const browser = chrome;

browser.webNavigation.onCommitted.addListener(async (details) => {
  const { url, tabId } = details;
  const { hostname, protocol } = new URL(url);

  const siteInfo = siteInfos.find((si) => {
    const pattern = new URLPattern(si.urlPattern);
    return pattern.test(`${protocol}//${hostname}`)
  });

  // nothning do in this site
  if(siteInfo === undefined) return;

  const sessionStorage = await browser.storage.session.get();

  if(sessionStorage.userPreference === undefined) {
    const cssFilePaths = [];
    for(const sectionName in siteInfo.sections) {
      const cssFilePath = siteInfo.sections[sectionName].cssFilePath;
      cssFilePaths.push(cssFilePath);
    }
    await insertCSS(cssFilePaths, tabId);

    // set the default userPreference
    const userPreference = {};
    siteInfos.forEach(siteInfo => {
      const { hostname } = new URL(siteInfo.urlPattern)
      userPreference[hostname] = {};
      for(const sectionName in siteInfo.sections) {
        userPreference[hostname][sectionName] = true;
      }
    })
    await browser.storage.session.set({ userPreference });
  } else {
    const cssFilePaths = [];
    for(const sectionName in siteInfo.sections) {
      if(sessionStorage.userPreference[hostname][sectionName] === true) {
        const cssFilePath = siteInfo.sections[sectionName].cssFilePath;
        cssFilePaths.push(cssFilePath)
      }
    }
    await insertCSS(cssFilePaths, tabId);
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  if(message.type === 'get_toggle_info') {
    const { hostname, protocol } = new URL(message.url);
    const sessionStorage = await browser.storage.session.get();
    const sectionsObj = siteInfos.find((si) => {
      const pattern = new URLPattern(si.urlPattern);
      return pattern.test(`${protocol}//${hostname}`)
    })?.sections;
    browser.runtime.sendMessage({
      toggleStatuses: sessionStorage.userPreference?.[hostname],
      sections: sectionsObj ? Object.keys(sectionsObj).map((item) => ({id: item, label: sectionsObj[item].label})) : [],
    });
  } else {
    const { hide, url, sectionToHide, tabId } = message;
    const { hostname, protocol } = new URL(url);
    const cssFilePath = siteInfos.find((si) => {
      const pattern = new URLPattern(si.urlPattern);
      return pattern.test(`${protocol}//${hostname}`)
    }).sections[sectionToHide].cssFilePath;
    const sessionStorage = await browser.storage.session.get();
    const toggleStatues = sessionStorage.userPreference[hostname];
    const isApplied = toggleStatues[sectionToHide];

    if (isApplied === false & hide === true) {
      insertCSS([cssFilePath], tabId);
      await browser.storage.session.set({
        userPreference: {
          ...sessionStorage.userPreference,
          [hostname]: {...toggleStatues, [sectionToHide]: true}
        }
      });
    } else if (hide === false) {
      removeCSS([cssFilePath], tabId);
      await browser.storage.session.set({
        userPreference: {
          ...sessionStorage.userPreference,
          [hostname]: {...toggleStatues, [sectionToHide]: false}
        }
      });
    }
  }
});
