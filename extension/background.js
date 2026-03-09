chrome.runtime.onInstalled.addListener(() => {
    console.log("Web Copilot Extension Installed successfully.");
});

// Listener for background tasks if needed later
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "ping") {
        sendResponse({ status: "ok" });
    }
    return true;
});
