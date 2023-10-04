 // grab the github container elements
let repoList = document.getElementById('repos-list')

// create a submit function
function handleForm(){
    document.addEventListener('DOMContentLoaded',()=>{
        let gitForm = document.getElementById('github-form')
        gitForm.addEventListener('submit',(e)=>{
            e.preventDefault()
            let userName = e.target.search.value
            renderSearch(userName)
        })
    })
    
}
handleForm()
function renderSearch(userName){
    fetch ('https://api.github.com/search/users?q=' + userName , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept : 'application/vnd.github.v3+json'
        },
        body: JSON.stringify()
    })
    .then(response => response.json())
    .then(userInfo => {
        let ul = document.getElementById('user-list')
        
        userInfo.items.forEach(user => {
            let userList = document.createElement('li')
            userList.innerHTML = `
            <h4> User: ${user.login}</h4>
            <p> Link: ${user.html_url}</p>
            <div>
                <button class= "repo-btn" style= "margin-bottom:25px; background:aqua; height:30px; border-radius:5px;">Go to Repository</button>
            </div>
            <img src= ${user.avatar_url} style= "height:100px; border-radius:50px;">
            ` 
            ul.appendChild(userList)
            document.querySelector('.repo-btn').addEventListener('click',()=>{
                fetch(user.repos_url, {
                    method: 'GET',
                    header:{
                        'Content-Type': 'application/json',
                        Accept : 'application/vnd.github.v3+json'
                    },
                    body:JSON.stringify()
                })
                .then(resp => resp.json())
                .then(data => {
                    data.forEach(repo => {
                        let reposList = document.createElement('li')
                        reposList.innerHTML = `
                        <h4>${repo.name}</h4>
                        <p>${repo.html_url}</p>
                        ` 
                        document.querySelector('#repos-list').appendChild(reposList)
                    })
                })
            }) 
        })
    })
}
