const params = new URLSearchParams(window.location.search);
const reason = decodeURIComponent(params.get("reason") || "");
const url = decodeURIComponent(params.get("url") || "");

window.addEventListener("DOMContentLoaded", () => {
    const reasonContainer = document.getElementById("reason") as HTMLSpanElement | null;
    const retryLink = document.getElementById("retry-link") as HTMLAnchorElement | null;

    if (reasonContainer) reasonContainer.textContent = reason;
    if (retryLink) retryLink.href = url;
});
