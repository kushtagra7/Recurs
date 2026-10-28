import { useEffect, useState } from "react";
import { getActiveTab, getPageInfo } from "./browser";
import { getSavedProblems, saveProblem } from "./storage";

function ExtensionHome() {

  const [currentUrl, setCurrentUrl] = useState("");
  const [isLeetCode, setIsLeetCode] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [isSaved, setIsSaved] = useState(false);  // tracks whether a problem is already saved 
  const [isSaving, setIsSaving] = useState(false);// tracks whether an operation is under working
  const [saveError, setSaveError] = useState(""); // stores an error msg if the saving fails

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

    const problems = await getSavedProblems();

    const alreadyExists = problems.some(
      (problem) => problem.url == url
    );

    setIsSaved(alreadyExists);
    }

    checkCurrentTab();
  }, []);

  //this function takes care of the saving mechanism
  async function handleSave(){
    if(isSaving || isSaved){
      return;
    }

    setIsSaving(true);
    setSaveError("");

    try {
      const problems = await getSavedProblems();

      const alreadyExists = problems.some(
        (problem) => problem.url === currentUrl
      );
      //.some() checks whether at least one array element satisfies a condition.
      //we use url as 2 problems can have same name but not the same url

      if (alreadyExists) {
        //we mark the problem as already saved and exit without inserting another copy
        setIsSaved(true);
        return;
      }

      //we create a js object that represents one saved problem
      const problem = {
        title: pageTitle,
        difficulty: difficulty,
        url: currentUrl,
        savedAt: new Date().toISOString(),
      };

      await saveProblem(problem);
      setIsSaved(true);
      //first line waits till the problem is saved 
      //second line marks the problem as saved only after the operation above which is run in the storage locally is completed

    } catch (error) {
      console.error("Failed to save problems:", error);
      setSaveError("Couldn't save this problem. Try Again");
    } finally{
      setIsSaving(false);
    }
  }

  return (
    <div>
      <h1>Recurs</h1>

      {isLeetCode ? (
        <>
          <p>LeetCode problem detected</p>
          <p>{pageTitle}</p>
          <p>{difficulty}</p>

          <button
            onClick={handleSave}
            disabled={isSaving || isSaved}
          >
            {isSaving
              ? "Saving..."
              : isSaved
                ? "Added to Recurs!!"
                : "Add to Recurs"}
          </button>

          {saveError && <p>{saveError}</p>}
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