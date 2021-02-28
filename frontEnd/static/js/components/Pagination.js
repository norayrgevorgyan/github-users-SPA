export default class Pagination {
    constructor({getRecords=()=>{}}){
        this.init();
        this.getRecords=getRecords
    }
    init() {
        this.btnWrapper = document.createElement('div');
        this.btnPrev = document.createElement('button');
        this.btnPrev.innerHTML = '< Prev';
        this.btnNext = document.createElement('button');
        this.btnNext.innerHTML = 'Next >';
        this.btnWrapper.appendChild(this.btnPrev);
        this.btnWrapper.appendChild(this.btnNext);
        this.btnWrapper.style.display = 'none';
    }

    setLinks(header) {
        const links = Pagination.parseHeaderLinks(header);
        if (links.next || links.prev) {
            if (links.prev) {
                this.btnPrev.onclick = () => this.getRecords(links.prev);
                this.btnPrev.disabled = false;
            } else {
                this.btnPrev.disabled = true;
            }
            if (links.next) {
                this.btnNext.onclick = () => this.getRecords(links.next);
                this.btnNext.disabled = false;
            } else {
                this.btnNext.disabled = true;
            }
            this.btnWrapper.style.display = 'flex';
        } else {
            this.btnWrapper.style.display = 'none';
        }
    }

    static parseHeaderLinks(header) {
        if (header.length === 0) {
            return false;
        }
        /** Split parts by comma*/
        const parts = header.split(',');
        const links = {};
        /**Parse each part into a named link*/
        for (const part of parts) {
            const section = part.split(';');
            if (section.length !== 2) {
                break;
            }
            const url = section[0].replace(/<(.*)>/, '$1').trim();
            const name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        }
        return links;
    }

}

