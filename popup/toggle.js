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
    labelElem.className = "flex items-center gap-3";

    labelElem.addEventListener("click", (e) => {
      if(e.target.tagName === "LABEL") return;

      browser.runtime.sendMessage({
        hide: e.target.checked,
        siteName: getSiteName(url),
        sectionToHide: toggleInfo.id,
        tabId,
      })
    });

    labelElem.innerHTML = `
      <input
        type="checkbox"
        class="[&:checked+div]:bg-indigo-600 [&:checked+div>span]:bg-white [&:checked+div>span]:inset-[3px_3px_auto_23px] [&:focus-visible+div]:outline sr-only"
        ${toggleInfo.isChecked ? "checked" : ""}
      />
      <div class="w-10 h-5 rounded-full relative outline-offset-2 outline-indigo-600 outline-2 bg-gray-200">
        <span class="w-3.5 h-3.5 bg-white inline-block rounded-full absolute inset-[3px_23px_auto_3px] transition-[inset] ease-in-out"></span>
      </div>
      ${toggleInfo.text}
    `
    return labelElem;
  }
});
