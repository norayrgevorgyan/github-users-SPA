import SearchItemsPage from "./SearchItemsPage.js";
import RepositoriesService from "../services/RepositoriesService.js";
import drawTable from "../components/RepositoriesTable.js";

export default class Repositories extends SearchItemsPage {
    constructor(params) {
        super({title: 'Repositories', apiPath: '/repositories', inColumn: 'name', ...params});
    }

    drawRecords(records) {
        this.contentWrapper.innerHTML = '';
        const table = drawTable(records);
        table ? this.contentWrapper.appendChild(table) : this.contentWrapper.innerHTML='No records found :(';
    }

    getRecords(api) {
        if (this.state.searchText === '') return false;
        RepositoriesService.getReposByName({per_page: this.per_page, name: this.state.searchText, api})
            .then(res => {
                if (res.status === 200) {
                    this.pagination.setLinks(res.link || []);
                    this.drawRecords(res.json.items)
                }else{
                    this.contentWrapper.innerHTML = res.json.message || 'Some Error occurred';
                }
            });
    }
}
