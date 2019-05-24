"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const tsoa_1 = require("@stridespark/tsoa");
const testController_1 = require("./../server/testController");
const authentication_1 = require("./../server/authentication");
const models = {
    "TestModelstring": {
        "properties": {
            "result": { "dataType": "string", "required": true },
        },
    },
    "Eenum": {
        "enums": ["'a'", "'b'"],
    },
};
const validationService = new tsoa_1.ValidationService(models);
function RegisterRoutes(app) {
    app.get('/v1/Controller', authenticateMiddleware([{ "apikey": [] }]), function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = new testController_1.TestController();
        const promise = controller.genstring.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/v1/Controller', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = new testController_1.TestController();
        const promise = controller.literalUnion.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    function authenticateMiddleware(security = []) {
        return (request, _response, next) => {
            let responded = 0;
            let success = false;
            const succeed = function (user) {
                if (!success) {
                    success = true;
                    responded++;
                    request['user'] = user;
                    next();
                }
            };
            const fail = function (error) {
                responded++;
                if (responded == security.length && !success) {
                    error.status = 401;
                    next(error);
                }
            };
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises = [];
                    for (const name in secMethod) {
                        promises.push(authentication_1.expressAuthentication(request, name, secMethod[name]));
                    }
                    Promise.all(promises)
                        .then((users) => { succeed(users[0]); })
                        .catch(fail);
                }
                else {
                    for (const name in secMethod) {
                        authentication_1.expressAuthentication(request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        };
    }
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode;
            if (isController(controllerObj)) {
                const headers = controllerObj.getHeaders();
                Object.keys(headers).forEach((name) => {
                    response.set(name, headers[name]);
                });
                statusCode = controllerObj.getStatus();
            }
            if (data || data === false) { // === false allows boolean result
                response.status(statusCode || 200).json(data);
            }
            else {
                response.status(statusCode || 204).end();
            }
        })
            .catch((error) => next(error));
    }
    function getValidatedArgs(args, request) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new tsoa_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map