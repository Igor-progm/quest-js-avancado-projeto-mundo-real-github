import { searchUser } from "./services/user.js"
import { repos } from "./services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"
import { getUserEvents } from "./services/events.js"
import { getLanguage } from "./services/languages.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
    }
)

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const ifEnterKeyIsPressed = key === 13
    
    if(ifEnterKeyIsPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

async function getUserData(userName) {
    
    const userResponse = await searchUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await repos(userName)
    const eventsResponse = await getUserEvents(userName)
    const languageResponse = await getLanguage(repositoriesResponse)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    user.setLanguage(languageResponse) 
    screen.renderUser(user)
    screen.renderEvents(user)
}

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert("Preencha o campo com nome de usuário!")
        return true
}}