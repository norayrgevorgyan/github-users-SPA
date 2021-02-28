export default class _Request {
    constructor(path, api = '/https://api.github.com/search') {
        this.path = api + path;
    }

    send(req, errHandler) {
        const path = `${this.path}${req.path}`;
        return _Request._makeRequest(req, path, errHandler).then((res) => {
            return res;
        })
    }

    static _makeRequest(req, path, errHandler) {
        return _Request.fetcher(req, path, errHandler)
            .then((res) => {
                /** Checking if response contains json body*/
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("json") !== -1) {
                    return res.json().then(json => {
                        return {status: res.status, json};
                    }).catch(err => console.log(err));
                    /** Checking if response contains text body*/
                } else {
                    return {status: res.status, json: {alertMsg: 'Error while getting JSON body from response'}};
                }
            })
            .catch(error => {
                console.log(error);
                if (errHandler) {
                }
                return {status: error.message, json: {}}
            });
    }

    static fetcher(req, path) {
        const headersObj = Object.assign({
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
        }, req.options.headers);

        const headers = new Headers(headersObj);

        const options = Object.assign({
            method: 'POST',
        }, req.options);

        options.headers = headers;
        const request = new Request(path, options);
        return fetch(request);
    }
}
