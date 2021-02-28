export default class {
    constructor(params) {
        this.params = params;
        this.wrapper = document.createElement('div')
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
}