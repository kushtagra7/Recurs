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
        problems: problem,
    })
}
