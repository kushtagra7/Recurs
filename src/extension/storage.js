const browserAPI = globalThis.browser ?? globalThis.HTMLAnchorElement;
//get all saved problems
export async function getSavedProblems() {
  const data = await browserAPI.storage.local.get("problems");

  const problems = Array.isArray(data.problems)
    ? data.problems
    : [];

  let needsUpdate = false;

/*
 * This function retrieves all saved LeetCode problems from browser storage.
 * It also ensures that every saved problem has a unique ID.
 *
 * STEP 1:
 * Fetch the saved problems from chrome.storage.local.
 *
 * STEP 2:
 * Check whether the stored data is an array.
 * If it isn't, use an empty array to prevent errors.
 *
 * STEP 3:
 * Create a needsUpdate flag, initially false.
 * This tracks whether any problem needs a new ID.
 *
 * STEP 4:
 * Use .map() to go through every saved problem.
 *
 * - If a problem already has an ID, keep it unchanged.
 * - If it doesn't have an ID:
 *     a) Set needsUpdate to true.
 *     b) Use the spread operator (...problem) to copy its existing data.
 *     c) Generate a unique ID using crypto.randomUUID().
 *
 * STEP 5:
 * If needsUpdate is true, save the updated array back
 * to browser storage.
 *
 * STEP 6:
 * Return the updated array of saved problems.
 *
 * IMPORTANT:
 * Existing IDs are preserved, so they don't change
 * every time the function runs.
 *
 * This process is called DATA MIGRATION because we are
 * upgrading older saved records to a newer data structure
 * without losing their existing information.
 */

  const updatedProblems = problems.map((problem) => {
    if (problem.id) {
      return problem;
    }

    needsUpdate = true;

    return {
      ...problem,
      id: crypto.randomUUID(),
    };
  });

  if (needsUpdate) {
    await browserAPI.storage.local.set({
      problems: updatedProblems,
    });
  }

  return updatedProblems;
}

//save a problem to recurs
export async function saveProblem(problem) {
    const problems =  await getSavedProblems();

    problems.push(problem);

    await browserAPI.storage.local.set({
        problems: problems,
    })
}
