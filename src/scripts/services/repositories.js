import { baseUrl, repositoriesLimit } from "../variables.js"

async function repos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesLimit}`);
    return await response.json()
}

export { repos }