export default class _Request {
    constructor(path, api = 'https://api.github.com') {
        this.path = api + path;
    }

    send(path, api, errHandler) {
        const _path = api ? api : `${this.path}${path}`;
        return _Request._makeRequest(_path, errHandler).then((res) => {
            return res;
        })
    }

    static _makeRequest(path) {
        return fetch(path)
            .then((res) => {
                /** Checking if response contains json body*/
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("json") !== -1) {
                    const link = res.headers.get('link');
                    return res.json().then(json => {
                        return {status: res.status, json, link};
                    }).catch(err => console.log(err));
                } else {
                    return {status: res.status, json: {alertMsg: 'Error while getting JSON body from response'}};
                }
            })
            .catch(error => {
                return {status: error.message, json: {}}
            });
    }
}