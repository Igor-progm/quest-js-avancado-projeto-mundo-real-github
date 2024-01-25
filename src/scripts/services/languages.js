async function getLanguage(repositories){
    const endPoints = repositories.map(repository => {
       return `https://api.github.com/repos/${repository.full_name}/languages`
    })
    
    const results = await Promise.all(endPoints.map(async endPoint =>{
        const response = await fetch(endPoint)
        return await response.json()
    }))

    const languages = results.map(result => Object.keys(result)[0])

    return languages
}

export { getLanguage }