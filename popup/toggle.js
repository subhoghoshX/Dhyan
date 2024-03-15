import { getSiteName } from "../utils.js";

const browser = chrome;

document.addEventListener("DOMContentLoaded", async () => {
  const togglesContainer = document.getElementById("toggles-container");

  const tabs = await browser.tabs.query({active: true, lastFocusedWindow: true});
  const { url, id: tabId } = tabs[0];

  browser.runtime.onMessage.addListener((message) => {
    const { toggleStatuses, sections } = message;
    sections.forEach(section => {
      togglesContainer.appendChild(createToggles({ id: section.id, text: section.id, isChecked: toggleStatuses[section.id] })); // TODO: text key
    })
  })

  browser.runtime.sendMessage({ type: 'get_toggle_info', siteName: getSiteName(url) });

  function createToggles(toggleInfo) {
    const labelElem = document.createElement("label");

    labelElem.addEventListener("click", (e) => {
      if(e.target.tagName === "LABEL") return;

      browser.runtime.sendMessage({
        hide: e.target.checked,
        siteName: getSiteName(url),
        sectionToHide: toggleInfo.id,
        tabId,
      })
    });

    if(toggleInfo.isChecked) {
      labelElem.innerHTML = `
        <input type="checkbox" checked />
        ${toggleInfo.text}
      `
    } else {
      labelElem.innerHTML = `
        <input type="checkbox" />
        ${toggleInfo.text}
      `
    }
    return labelElem;
  }
});
