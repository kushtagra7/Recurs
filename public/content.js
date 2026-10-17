/*
    → runs on LeetCode page
    → listens for popup messages
    → reads page DOM
    → sends data back
*/

const browserAPI = globalThis.browser ?? globalThis.chrome;

// Listen for messages from the Recurs popup
browserAPI.runtime.onMessage.addListener(
    (message, sender, sendResponse)=>{

        // If popup asks for page info
        if(message.type === "GET_PAGE_INFO"){
            // Send current page title and URL back
            sendResponse({
                title: document.title,
                url: window.location.href,
            });
        }
    }
);