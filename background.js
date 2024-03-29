import * as siteInfos from "./css-to-apply.js";
import { getSiteName, insertCSS, removeCSS } from "./utils.js";

const browser = chrome;

browser.webNavigation.onCommitted.addListener(async (details) => {
  const { url, tabId } = details;
  const siteName = getSiteName(new URL(url).host);
  if(siteName === undefined) return;

  const siteInfo = siteInfos[siteName];

  const sessionStorage = await browser.storage.session.get();

  if(sessionStorage.userPreference === undefined) {
    const cssFilePaths = [];
    for(const sectionName in siteInfo.sections) {
      const cssFilePath = siteInfo.sections[sectionName];
      cssFilePaths.push(cssFilePath);
    }
    await insertCSS(cssFilePaths, tabId);

    // set the default userPreference
    const userPreference = {};
    for(const siteName in siteInfos) {
      userPreference[siteName] = {};
      for(const sectionName in siteInfos[siteName].sections) {
        userPreference[siteName][sectionName] = true;
      }
    }
    await browser.storage.session.set({ userPreference });
  } else {
    const cssFilePaths = [];
    for(const sectionName in siteInfo.sections) {
      if(sessionStorage.userPreference[siteName][sectionName] === true) {
        const cssFilePath = siteInfo.sections[sectionName];
        cssFilePaths.push(cssFilePath)
      }
    }
    await insertCSS(cssFilePaths, tabId);
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  if(message.type === 'get_toggle_info') {
    const sessionStorage = await browser.storage.session.get();
    const sectionsObj = siteInfos[message.siteName]?.sections;
    browser.runtime.sendMessage({
      toggleStatuses: sessionStorage.userPreference?.[message.siteName],
      sections: sectionsObj ? Object.keys(sectionsObj).map((item) => ({id: item})) : [],
    });
  } else {
    const { hide, siteName, sectionToHide, tabId } = message;
    const cssFilePath = siteInfos[siteName].sections[sectionToHide];
    const sessionStorage = await browser.storage.session.get();
    const toggleStatues = sessionStorage.userPreference[siteName];
    const isApplied = toggleStatues[sectionToHide];

    if (isApplied === false & hide === true) {
      insertCSS([cssFilePath], tabId);
      await browser.storage.session.set({
        userPreference: {
          ...sessionStorage.userPreference,
          [siteName]: {...toggleStatues, [sectionToHide]: true}
        }
      });
    } else if (hide === false) {
      removeCSS([cssFilePath], tabId);
      await browser.storage.session.set({
        userPreference: {
          ...sessionStorage.userPreference,
          [siteName]: {...toggleStatues, [sectionToHide]: false}
        }
      });
    }
  }
});
