import { baseUrl } from "../variables.js";

async function getUserEvents(userName){
    const events = await fetch(`${baseUrl}/${userName}/events`)
    return await events.json()
}

export { getUserEvents }