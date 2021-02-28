import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor(params) {
        super(params);
        this.setTitle("Repositories");
        this.state = {
            loading: false,
            repositories: [],
            searchText: '',
        };
        this.per_page = 20;
        this.repoListWrapper=null;
        this.init();
    }

    init() {
        let input = document.createElement('input');
        input.setAttribute('placeholder', "Search for repositories");
        input.setAttribute('id', "search-input");
        input.addEventListener('keyup', ({key}) => {
            if (key === 'Enter' && input.value !== this.state.searchText) {
                this.state.searchText = input.value;
                this.getRepositories()
            }
        });
        this.repoListWrapper = document.createElement('div');
        this.repoListWrapper.setAttribute('id', "repo-list-wrapper");
        this.wrapper.appendChild(input);
        this.wrapper.appendChild(this.repoListWrapper);
    }

    getRepositories() {
        if (this.state.searchText === '') return false;
        // RepositoriesService.getRepositoriesByName({searchText:this.state.searchText})
        fetch(`https://api.github.com/search/repositories?q=${this.state.searchText}+in:name&per_page=${this.per_page}`)
            .then(res => {
                let links = res.headers.get('link');
                console.log(typeof links)
                return res.json()
            })
            .then(data => this.drawRepositories(data.items))
    }

    drawRepositories(items) {
        for (const item of items) {
            let itemDiv = document.createElement('div');
            itemDiv.setAttribute('id', item.id)
            let itemName = document.createElement('span');
            itemName.innerHTML=item.name;
            let itemURL = document.createElement('a');
            itemURL.setAttribute('href',item.html_url);
            itemURL.setAttribute('target','blank');
            itemURL.innerHTML=item.html_url;
            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemURL);
            this.repoListWrapper.appendChild(itemDiv)
        }
    }

    async getHtml() {
        return this.wrapper;
    }
}
