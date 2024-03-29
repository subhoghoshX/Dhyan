import { getSiteName } from "../utils.js";

const browser = chrome;

document.addEventListener("DOMContentLoaded", async () => {
  const togglesContainer = document.getElementById("toggles-container");

  const tabs = await browser.tabs.query({active: true, lastFocusedWindow: true});
  const { url, id: tabId } = tabs[0];

  browser.runtime.onMessage.addListener((message) => {
    const { toggleStatuses, sections } = message;

    if(sections.length === 0) {
      togglesContainer.innerHTML = `
        <section class="flex flex-col items-center">
          <svg class="w-32 h-32 fill-zinc-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M176 80L39.36 247h77.74L176 144l32 48v-48l-32-64zm160 0l-32 64v48l32-48 58.9 103h77.7L336 80zM25 265v174h194.2l36.8-55.2 36.8 55.2H487V265H25zm23 23h176v64l-32 64H48V288zm240 0h176v128H320l-32-64v-64z"/></svg>
          <p class="text-zinc-300">Not applicable in this site.</p>
        </section>
      `
      return;
    }
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
