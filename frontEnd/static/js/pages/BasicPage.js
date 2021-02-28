export default class BasicPage{
    constructor({title, ...params}) {
        this.params = params;
        this.wrapper = document.createElement('div');
        this.header = null;
        this.contentWrapper = null;
        this.state = {
            loading: false,
        };
        this.per_page = 20;
        this.initBase(title)
    }

    initBase(title){
        /** Here will add Prev and Next buttons*/
        this.header = document.createElement('div');
        this.header.classList.add("page-header");

        this.wrapper.appendChild(this.header);

        this.contentWrapper = document.createElement('div');
        this.wrapper.appendChild(this.contentWrapper);
        document.title = title;
    }

    async getHtml() {
        return this.wrapper;
    }
}