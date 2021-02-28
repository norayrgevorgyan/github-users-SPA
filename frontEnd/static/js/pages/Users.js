import SearchItemsPage from "./SearchItemsPage.js";

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

    drawRecords(items) {
        this.recordsList.innerHTML = '';
        for (const item of items) {
            this.recordsList.appendChild(Users.createRecordItem(item))
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
