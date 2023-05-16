export class GithubUser {
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`
        return fetch(endpoint).then(data => data.json())
        .then(({ login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

        GithubUser.search('diego3g').then(user => console.log(user))
    }



    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }
     
    async add(username){
        const user = await GithubUser.search(username)
        console.log(user)
    }

    delete(user){
         
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
    }
}


export class FavoritesView extends Favorites{
    constructor(root){
        super(root)

        this.tbody = document.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd(){
    const addButton = this.root.querySelector('.divletter2 button')
    addButton.onclick = () => {
        const { value } = this.root.querySelector('.divletter2 input')
        this.add(value)
    }
    }

    update()
    {
            this.removeAllTr()
            
        this.entries.forEach( user => 
        {
            const row = this.createRow()
            row.querySelector('.name img').src = `https://github.com/${user.login}.png`
            row.querySelector('.name p').textContent = user.name
            row.querySelector('.name span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.btn-remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk){
                    this.delete(user)
                }
            }

            this.tbody.append(row)

        })

    }

    createRow(){
        const tr = document.createElement('tr')
        tr.innerHTML = 
        `

            <td class="name">
                <img src="https://github.com/Rafael862.png" alt="Imagem de null">
                <a href="https://github.com/Rafael862" target="_blank">
                    <p>Rafael Ferreira</p>
                    <span>Rafael862</span>
                </a>
            </td>
            <td class="repositories">55</td>
            <td class="followers">4</td>
            <td class="acao"><button class="btn-remove">Remover</button></td>
        
        `
        return tr
    }

    removeAllTr(){

        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })

    }
}