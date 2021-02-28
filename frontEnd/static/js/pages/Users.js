import SearchItemsPage from "./SearchItemsPage.js";
import UsersService from "../services/UsersService.js";

export default class Users extends SearchItemsPage {
    constructor(params) {
        super({title: 'Users', apiPath: '/users', inColumn: 'user', ...params});
        this.init()
    }

    init() {
        this.recordsList = document.createElement('div');
        this.recordsList.classList.add("records-list");
        this.contentWrapper.appendChild(this.recordsList)
    }

    getRecords(api) {
        if (this.state.searchText === '') return false;
        UsersService.getUsersByName({per_page: this.per_page, name: this.state.searchText, api})
            .then(res => {
                if (res.status === 200) {
                    this.pagination.setLinks(res.link || []);
                    this.drawRecords(res.json.items || [])
                }else{
                    this.recordsList.innerHTML = res.json.message || 'Some Error occurred';
                }
            });
    }

    drawRecords(items) {
        this.recordsList.innerHTML = '';
        if (items.length > 0) {
            for (const item of items) {
                this.recordsList.appendChild(Users.createRecordItem(item))
            }
        } else {
            this.recordsList.innerHTML = 'No records found :(';
        }
    }

    static createRecordItem(item) {
        const itemName = document.createElement('span');
        itemName.innerHTML = item.login;
        const itemImage = document.createElement('img');
        itemImage.setAttribute('src', item.avatar_url);
        itemImage.setAttribute('alt', 'Avatar');

        const itemDiv = document.createElement('div');
        itemDiv.classList.add("user-card");
        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(itemName);

        const link = document.createElement('a');
        link.setAttribute('href', `/users/${item.login}`);
        link.appendChild(itemDiv);
        return link;
    }
}
