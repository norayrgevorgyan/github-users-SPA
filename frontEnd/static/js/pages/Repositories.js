import SearchItemsPage from "./SearchItemsPage.js";
import RepositoriesTable from "../components/RepositoriesTable.js";

export default class Repositories extends SearchItemsPage {
    constructor(params) {
        super({title: 'Repositories', apiPath: '/repositories', inColumn: 'name', ...params});
    }

    drawRecords(records) {
        this.contentWrapper.innerHTML='';
        this.contentWrapper.appendChild(RepositoriesTable.drawTable(records))
    }
}
