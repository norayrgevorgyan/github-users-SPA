import Request from './Request.js';

class RepositoriesService extends Request {
    constructor() {
        super('');
    }

    getReposByName({per_page, name, api}) {
        return this.send(`/search/repositories?q=${name}+in:name&per_page=${per_page}`, api)
    }
}

export default new RepositoriesService();