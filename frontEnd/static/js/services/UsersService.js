import Request from './Request.js';

class UsersService extends Request {
    constructor() {
        super('');
    }

    getUsersByName({per_page, name, api}) {
        return this.send(`/search/users?q=${name}+in:user&per_page=${per_page}`, api)
    }

    getUserById({id}) {
        return this.send(`/users/${id}`)
    }

    getUserRepos({login, per_page, api}) {
        return this.send(`/users/${login}/repos?&per_page=${per_page}`, api)
    }
}

export default new UsersService();