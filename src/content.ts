(async () => {
    const src = chrome.runtime.getURL("src/settings.js");
    const { g } = await import(src);

    const blockPage = (url: string, reason: string) => {
        window.stop();
        const params = new URLSearchParams({ url, reason });
        window.location.href = chrome.runtime.getURL(`blocked.html?${params}`);
    };

    const blockers = {
        ipDomain: (domain: string, url: string) =>
            /^(\d{1,3}\.){3}\d{1,3}$/.test(domain) &&
            (blockPage(url, "Reason: IP address instead of domain."), true),

        punycodeDomain: (domain: string, url: string) =>
            domain.includes('xn--') && (blockPage(url, "Reason: Punycode / IDN domain detected."), true),

        excessiveSpecialChars: (domain: string, url: string, max: number) =>
            (domain.match(/[-_]/g) || []).length > max &&
            (blockPage(url, "Reason: Excessive special characters in domain."), true),

        excessiveSubdomains: (domain: string, url: string, max: number) =>
            domain.split('.').length > max &&
            (blockPage(url, "Reason: Too many subdomains."), true),

        forbiddenDomains: (domain: string, url: string, forbidden: string[]) =>
            forbidden.includes(domain) &&
            (blockPage(url, "Reason: Forbidden domain."), true),

        dataUri: (url: string) =>
            url.startsWith('data:') &&
            (blockPage(url, "Reason: Data URI."), true),

        hiddenDomain: (url: string) =>
            url.includes('@') &&
            (blockPage(url, "Reason: Possible hidden domain."), true),

        forbiddenUrls: (url: string, forbidden: string[]) =>
            forbidden.includes(url) &&
            (blockPage(url, "Reason: Forbidden URL."), true),

        forbiddenTdls: (url: string, forbidden: string[]) =>
            forbidden.some(t => url.endsWith(t)) &&
            (blockPage(url, "Reason: Forbidden top-level domain."), true),

        dangerousExtension: (path: string, url: string) =>
            ['.exe', '.scr', '.bat', '.cmd', '.vbs', '.js', '.jar'].some(ext => path.endsWith(ext)) &&
            (blockPage(url, "Reason: Dangerous file extension."), true),

        forbiddenWords: (url: string, forbidden: string[]) => {
            const regex = new RegExp(forbidden.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');
            window.addEventListener("DOMContentLoaded", () =>
                regex.test(document.body?.textContent || "") &&
                blockPage(url, "Reason: Page contains forbidden words.")
            );
        }
    };

    const { hostname: domain, href: url, pathname: path } = window.location;
    const settings = await g();

    if (settings?.protectionEnabled) {
        blockers.ipDomain(domain, url) ||
            blockers.punycodeDomain(domain, url) ||
            blockers.hiddenDomain(url) ||
            blockers.excessiveSubdomains(domain, url, 4) ||
            blockers.excessiveSpecialChars(domain, url, 3) ||
            blockers.dataUri(url) ||
            blockers.forbiddenDomains(domain, url, settings.forbiddenDomains) ||
            blockers.forbiddenUrls(url, settings.forbiddenUrls) ||
            blockers.forbiddenTdls(url, settings.forbiddenTdls) ||
            blockers.dangerousExtension(path, url) ||
            blockers.forbiddenWords(url, settings.forbiddenWords);
    }
})();