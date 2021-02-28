import Request from './Request';

export default class extends Request {
    constructor() {
        super('/repositories');
        this.per_page=20
    }

    getRepositoriesByName({searchText}) {
        const options = {
            method: 'GET'
        };
        return this.send({path: `?q=${searchText}+in:name&per_page${this.per_page}`, options})
    }

    getUserById({id}) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/${id}`, options})
    }
}