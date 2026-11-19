export function normalizeProblemUrl(url){
    try{
        const parsedUrl = new URL(url); //new URL(url) converts a URL string into an object containing information such as hostname, pathname, and search.

        const match = parsedUrl.pathname.match(
            /^\/problems\/([^/]+)/
        );

        const isLeetCode = [
            "leetcode.com",
            "www.leetcode.com",
        ].includes(parsedUrl.hostname);

        if(!isLeetCode || !match) {
            return url;
        }

        return `https://leetcode.com/problems/${match[1]}/`;
        } catch {
            return url;
        }
}