
const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                           <img src="${user.avatarUrl} alt="Foto de perfil do usuário" />
                          <div class="data">
                              <h1>${user.name ?? 'Não possui nome cadastrado 😓'}</h1>
                              <p>${user.bio ?? 'Não possui bio cadastrada 😓'}</p>
                              <br>
                              <p>${"Seguidores: "}${user.followers}${" ❤️"}</p>
                              <p>${"Seguindo: "}${user.following}${" 🤩"}</p>
                          </div>
                        </div>`

        let repositoriesItens = ''
        
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                                                        <ul class="repo-info">
                                                                            <li class="i">${"🍴"}${repo.forks}</li>
                                                                            <li class="i">${"⭐"}${repo.stargazers_count}</li>
                                                                            <li class="i">${"👀"}${repo.watchers}</li>
                                                                            <li class="i">${"🧑‍💻"}${repo.language}</li>
                                                                        </ul>
                                                                    </a>
                                                                </li>`)
        
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },
    renderEvents(user) {
        const filteredEvents = user.events.filter(event => {
            return event.type === "CreateEvent" || event.type === "PushEvent"
        }).slice(0, 10)

        let eventItens = ''
        
        if(user.events.length > 0){
            filteredEvents.forEach(event => eventItens += `<li><b>${event.repo.name}</b> - <span>${event.payload.commits ? event.payload.commits[0].message : event.created_at}</span></li>`)
        }
        this.userProfile.innerHTML += `<div class="events section">
                                        <h2>Eventos</h2>
                                        <ul>${eventItens != "" ? eventItens : `<li>O usuário ${user.userName} não possui eventos</li>`}</ul>
                                       </div>`
    }
}

export { screen }