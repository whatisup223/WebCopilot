chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract") {
        try {
            const paragraphs = Array.from(document.querySelectorAll('p, h1, h2, h3, article'))
                .map(el => el.innerText.trim())
                .filter(text => text.length > 20);

            let text = paragraphs.join('\n');

            if (text.length > 4000) {
                text = text.substring(0, 4000) + '...';
            }

            if (!text || text.length === 0) {
                text = document.body.innerText.substring(0, 4000);
            }

            sendResponse({ text: text });
        } catch (e) {
            sendResponse({ text: "Error extracting text." });
        }
    }
    return true;
});

// Securely handle copying requests from the iframe to bypass clipboard iframe policy
window.addEventListener('message', async (event) => {
    if (event.data && event.data.action === 'copy-to-clipboard') {
        const textToCopy = event.data.text;

        try {
            // Priority 1: Modern API async fallback
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
                return;
            }
        } catch (e) {
            console.warn('Navigator clipboard failed in content script, trying legacy fallback.', e);
        }

        // Priority 2: Legacy execCommand hack
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        // Move outside of viewport to be invisible
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textarea);
    }
});

// Create Floating Chat Bubble for Web Copilot
if (!window._webCopilotInjected) {
    window._webCopilotInjected = true;

    // Inject elegant styles directly
    const style = document.createElement('style');
    style.innerHTML = `
        #web-copilot-floating-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
            border-radius: 50%;
            cursor: pointer;
            z-index: 2147483647;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.4), 0 8px 10px -6px rgba(249, 115, 22, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
        #web-copilot-floating-btn:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.5), 0 10px 10px -5px rgba(249, 115, 22, 0.3);
        }
        #web-copilot-floating-btn:active {
            transform: scale(0.95);
        }
        
        #web-copilot-iframe-container {
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 380px;
            height: 600px;
            max-height: calc(100vh - 140px);
            background: transparent;
            border-radius: 28px;
            z-index: 2147483647;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px) scale(0.95);
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.7);
        }
        #web-copilot-iframe-container.show {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) scale(1);
        }
        #web-copilot-iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
        }
        
        /* Pulse Animation on initial load to grab attention */
        @keyframes copilotPulse {
            0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.6); }
            70% { box-shadow: 0 0 0 15px rgba(249, 115, 22, 0); }
            100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        .copilot-pulse {
            animation: copilotPulse 2s infinite;
        }
    `;
    document.head.appendChild(style);

    // Create iframe container
    const container = document.createElement('div');
    container.id = "web-copilot-iframe-container";

    // We must load popup.html via chrome.runtime.getURL
    const iframe = document.createElement('iframe');
    iframe.id = "web-copilot-iframe";
    iframe.src = chrome.runtime.getURL("popup.html");
    iframe.allow = "clipboard-write";
    container.appendChild(iframe);

    // Create floating button
    const btn = document.createElement('div');
    btn.id = "web-copilot-floating-btn";
    btn.classList.add('copilot-pulse'); // Add attention pulse

    const iconW = `<span style="font-family: system-ui, sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -2px;">W</span>`;
    const iconClose = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    btn.innerHTML = iconW;

    // Toggle Logic
    let isOpen = false;
    btn.addEventListener('click', () => {
        isOpen = !isOpen;

        // Remove pulse after first click
        btn.classList.remove('copilot-pulse');

        if (isOpen) {
            container.classList.add('show');
            btn.innerHTML = iconClose;
            // Optionally reload the iframe if needed, but keeping it loaded is faster.
        } else {
            container.classList.remove('show');
            btn.innerHTML = iconW;
        }
    });

    // Append to body after DOM Content Loaded safely
    if (document.body) {
        document.body.appendChild(container);
        document.body.appendChild(btn);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(container);
            document.body.appendChild(btn);
        });
    }
}
