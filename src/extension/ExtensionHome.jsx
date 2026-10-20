import { useEffect, useState } from "react";
import { getActiveTab, getPageInfo } from "./browser";

function ExtensionHome() {

  const [currentUrl, setCurrentUrl] = useState("");
  const [isLeetCode, setIsLeetCode] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    async function checkCurrentTab() {
    const tab = await getActiveTab();

    if (!tab) {
        return;
    }

    const url = tab.url || "";
    setCurrentUrl(url);

    const leetCodePage =
        url.includes("leetcode.com/problems/");

    setIsLeetCode(leetCodePage);

    if (!leetCodePage || !tab.id) {
        return;
    }

    const pageInfo = await getPageInfo(tab.id);
    if (pageInfo) {
        setPageTitle(pageInfo.title || "");
        setDifficulty(pageInfo.difficulty || "");
    }
    }

    checkCurrentTab();
  }, []);

  return (
    <div>
      <h1>Recurs</h1>

      {isLeetCode ? (
        <>
          <p>LeetCode problem detected</p>
          <p>{pageTitle}</p>
          <p>{difficulty}</p>
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