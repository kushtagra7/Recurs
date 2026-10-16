import { useEffect, useState } from "react";
import { getActiveTab } from "./browser";

function ExtensionHome() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLeetCode, setIsLeetCode] = useState(false);

  useEffect(() => {
    async function checkCurrentTab() {
      const tab = await getActiveTab();

      if (!tab) {
        return;
      }

      const url = tab.url || "";

      setCurrentUrl(url);

      setIsLeetCode(
        url.includes("leetcode.com/problems/")
      );
    }

    checkCurrentTab();
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
        <p>Open a LeetCode problem to get started.</p>
      )}
    </div>
  );
}

export default ExtensionHome;

/*
    When the Recurs popup opens, ask the browser which tab is active. 
    If there is a tab, get its URL. Store the URL in React state. 
    Check whether the URL belongs to a LeetCode problem. 
    Then render one message if it is LeetCode and another if it isn't.
*/ 