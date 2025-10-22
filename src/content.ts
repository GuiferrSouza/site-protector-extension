(async () => {
  const src = chrome.runtime.getURL("assets/settings.js");
  const settingsModule = await import(src);
  const { g } = settingsModule;

  function blockPage(urlBlocked: string) {
    window.stop();
    const pageURL = encodeURIComponent(urlBlocked);
    const blockedPageURL = chrome.runtime.getURL(`blocked.html?url=${pageURL}`);
    window.location.href = blockedPageURL;
  }

  function blockDomain(domain: string, currentURL: string) {
    if (currentURL.startsWith(domain)) blockPage(currentURL);
  }

  function blockExact(url: string, currentURL: string) {
    if (currentURL === url) blockPage(currentURL);
  }

  function blockWords(words: string[], currentURL: string) {
    window.addEventListener("DOMContentLoaded", () => {
      const bodyText = document.body?.innerText.toLowerCase() || "";
      const foundWord = words.find((word) => bodyText.includes(word.toLowerCase()));
      if (foundWord) blockPage(currentURL);
    });
  }

  async function checkPage() {
    const currentURL = window.location.href;
    const settings = await g();

    if (!settings?.protectionEnabled) return;

    if (settings.whitelist.some((site: string) => currentURL.startsWith(site))) return;
    settings.blacklist.forEach((site: string) => blockDomain(site, currentURL));
    settings.exactList.forEach((site: string) => blockExact(site, currentURL));

    blockWords(settings.forbiddenWords, currentURL);
  }

  checkPage();
})();