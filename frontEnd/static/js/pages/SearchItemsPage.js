import BasicPage from "./BasicPage.js";
import Pagination from "../components/Pagination.js";

export default class SearchItemsPage extends BasicPage {
    constructor({title, ...params}) {
        super({title, ...params});
        this.state.searchText = '';
        this._init(title);
    }

    _init(title) {
        const input = document.createElement('input');
        input.setAttribute('placeholder', `Search for ${title}`);
        input.addEventListener('keyup', ({key}) => {
            if (key === 'Enter' && input.value !== this.state.searchText) {
                this.state.searchText = input.value;
                this.getRecords()
            }
        });

        this.header.appendChild(input);
        this.pagination = new Pagination({getRecords: (api)=>this.getRecords(api)});
        this.header.appendChild(this.pagination.btnWrapper);
    }

}