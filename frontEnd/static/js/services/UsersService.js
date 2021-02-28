import Request from './Request';

class UsersService extends Request {
    constructor() {
        super();
    }

    getUsersByCriteria({page, size, criteria = {}}) {
        const options = {
            method: 'POST',
            body: JSON.stringify(criteria),
        };
        return this.send({path: ``, options})
    }

    getUserById({id}) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/${id}`, options})
    }
}

export default new UsersService();