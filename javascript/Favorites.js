export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = 
        [
            {
                login: 'maykbrito',
                name: 'Mayk Brito',
                publick_repos: '76',
                followers: '1200'
            },
            {
                login: 'diego3g',
                name: 'Diego Fernandes',
                publick_repos: '86',
                followers: '2200'
            }
        ]
    }
    delete(user){
         
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        console.log(filteredEntries)
    }
}


export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.tbody = document.querySelector('table tbody')

        this.update()
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
            row.querySelector('.repositories').textContent = user.publick_repos
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

        this.tbody.querySelectorAll('tr').forEach((tr) => {
            console.log(tr)
        })

    }
}