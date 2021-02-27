import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
        this.state = {
            loading: false,
            userRecords: []
        }
        this.init();
    }

    init() {
        let input= document.createElement('input');
        input.setAttribute('placeholder', "Search for users");
        input.setAttribute('id', "search-input");
        input.addEventListener('keyup',({key})=>{
            if(key === 'Enter') input.setAttribute('value', 'asfasf')
        })
        this.wrapper.appendChild(input)
    }

    onKeyUP = (e) => {
        console.log(e)
    }

    async getHtml() {
        return this.wrapper;
    }
}