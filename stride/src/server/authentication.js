"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function expressAuthentication(req, name, scopes) {
    if (name === 'api_key') {
        let token;
        if (req.query && req.query.access_token) {
            token = req.query.access_token;
        }
        else {
            return Promise.reject({});
        }
        if (token === 'abc123456') {
            return Promise.resolve({
                id: 1,
                name: 'Ironman',
            });
        }
        else if (token === 'xyz123456') {
            return Promise.resolve({
                id: 2,
                name: 'Thor',
            });
        }
        else {
            return Promise.reject({});
        }
    }
    else {
        if (req.query && req.query.tsoa && req.query.tsoa === 'abc123456') {
            return Promise.resolve({});
        }
        else {
            return Promise.reject({});
        }
    }
}
exports.expressAuthentication = expressAuthentication;
//# sourceMappingURL=authentication.js.map