import { searchUser } from "./services/user.js"
import { repos } from "./services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

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
    
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)
}

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert("Preencha o campo com nome de usuário!")
        return true
}}