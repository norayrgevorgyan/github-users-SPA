import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor(params) {
        super(params);
        this.setTitle("Users");
        this.state = {
            loading: false,
            userRecords: [],
            searchText:'',
        };
        this.init();
    }

    init() {
        let input= document.createElement('input');
        input.setAttribute('placeholder', "Search for users");
        input.setAttribute('id', "search-input");
        input.addEventListener('keyup',({key})=>{
            if(key === 'Enter' && input.value !== this.state.searchText) {
                this.state.searchText = input.value;
                this.getUserRecords()
            }
        });
        this.wrapper.appendChild(input);
    }

    getUserRecords(){
        if(this.state.searchText ===  '') return false;


    }

    async getHtml() {
        return this.wrapper;
    }
}
