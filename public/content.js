/*
    → runs on LeetCode page
    → listens for popup messages
    → reads page DOM
    → sends data back
*/

//this makes the title of the problem very cleaner in the extesion
const browserAPI = globalThis.browser ?? globalThis.chrome;
function getProblemTitle(){
    const pageTitle = document.title;

    return pageTitle
        .replace(" - LeetCode","") //removes leetcode
        .replace(/^d+\.\s*/,"")   //removes problem number
        .trim();                  //removes extra spaces
}


// Listen for messages from the Recurs popup
browserAPI.runtime.onMessage.addListener(
    (message, sender, sendResponse)=>{

        // If popup asks for page info
        if(message.type === "GET_PAGE_INFO"){
            // Send current page title and URL back
            sendResponse({
                title: getProblemTitle(),
                difficulty: getProblemDifficulty(),
                url: window.location.href,
            });
        }
    }
);

//this searches the whoel leetcode dom for all the divs to find any element that has the text values easy med or hard and then extracts those values.
//we cant trust class names as they cant be trusted and in the future if lc decide to change the class names then it should still be compatible 
function getProblemDifficulty(){
    const difficultyLevels = ["Easy", "Medium", "Hard"];
    const elements = document.querySelectorAll("div, span");

    for(const element of elements){
        const text = element.textContent.trim();
        if(difficultyLevels.includes(text)){
            return text;
        }
    }
    return null;
}