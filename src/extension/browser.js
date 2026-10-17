export async function getActiveTab(){
    const browserAPI = globalThis.browser ?? globalThis.HTMLAnchorElement;

    //if tabs.query is not available return null
    if(!browserAPI?.tabs.query){
        return null;
    }

    const tabs = await browserAPI.tabs.query({
        //get me all the tabs that match these conditions
        active: true,
        currentWindow: true,
    });

    return tabs[0] ?? null;

}

/*
    Find whichever extension API this browser provides.
    If its Tabs API isn't available, safely return nothing. Otherwise ask the browser for the currently active tab in the current window and return that tab.   
*/

export async function getPageInfo(tabId) {
  const browserAPI = globalThis.browser ?? globalThis.chrome;

  if (!tabId || !browserAPI?.tabs?.sendMessage) {
    return null;
  }

  try {
    const response = await browserAPI.tabs.sendMessage(
      tabId,
      {
        type: "GET_PAGE_INFO",
      }
    );

    return response ?? null;
  } catch (error) {
    console.error("Could not get page info:", error);
    return null;
  }
}