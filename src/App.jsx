import { useEffect, useState } from "react";
import browser from "webextension-polyfill";


function App() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLeetCode, setIsLeetCode] = useState(false);

  useEffect(() => {
    async function getCurrentTab() {
      try{
        //browser query that checks whether there is an active tab or an active window
        //tabs is an array, the query gives an array of tabs
        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true
        });

        //assuming active tab is the first tab we tak tabs[0] if not give empty url
        const url = tabs[0]?.url || "";

        //set url as current url
        setCurrentUrl(url);
        if(url.includes("leetcode.com/problems")){
          setIsLeetCode(true);
        }

      } catch (error) {
        console.error("Recurs tab detection error:",error);
      }

    }
    getCurrentTab();
  }, []);

    return (
        <div>
            <h1>Recurs</h1>

            {isLeetCode ? (
              <>
                <p>LeetCode problem detected</p>
                <p>{currentUrl}</p>
              </>
            ) : (
              <p>Open a LeetCode problem to use Recurs</p>
            )}
        </div>
    )
}

export default App