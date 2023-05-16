import { GithubUser } from "./GithubUser.js"

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

        //GithubUser.search('diego3g').then(user => console.log(user))
    }



    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:',JSON.stringify(this.entries))
    }

    convertToLowerCase(){
        let input = document.getElementById('input-search')
        input.value = input.value.toLocaleLowerCase()
      }
     
    async add(username){
        try{

            const userExists = this.entries.find(entry => entry.login === username)
            console.log(userExists)

            if(userExists){
                throw new Error('Usuário já cadastrado')
            }

            const user = await GithubUser.search(username)
            
            if(user.login === undefined){
            throw new Error('Usuário não encontrado!')
        }
        this.entries = [user, ...this.entries]
        this.update()
        this.save()
    }catch(error){
        alert(error.message)
    }
    }

    delete(user){
        
            const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
            
            this.entries = filteredEntries
            this.update()
            this.save()
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
        this.add(value.toLocaleLowerCase())
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
            row.querySelector('.name a').href = `https://github.com/${user.login}`
            row.querySelector('.name span').textContent = user.login.toLocaleLowerCase()
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