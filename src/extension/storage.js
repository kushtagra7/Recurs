const browserAPI = globalThis.browser ?? globalThis.HTMLAnchorElement;
//get all saved problems
export async function getSavedProblems() {
    const data = await browserAPI.storage.local.get("problems");

    return data.problems || [];
}

//save a problem to recurs
export async function saveProblem(problem) {
    const problems =  await getSavedProblems();

    problems.push(problem);

    await browserAPI.storage.local.set({
        problems: problems,
    })
}

//Current Flow
/*
    getSavedProblems() reads the existing saved array.
    problems.push(problem) adds the new problem to that array.
    storage.local.set(...) writes the updated array back to browser storage.
*/
