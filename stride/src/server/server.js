"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");
const routes_1 = require("../routes/routes");
exports.app = express();
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use(bodyParser.json());
exports.app.use(methodOverride());
exports.app.use((req, res, next) => {
    req.stringValue = 'fancyStringForContext';
    next();
});
routes_1.RegisterRoutes(exports.app);
// It's important that this come after the main routes are registered
exports.app.use((err, req, res, next) => {
    const status = err.status || 500;
    const body = {
        fields: err.fields || undefined,
        message: err.message || 'An error occurred during the request.',
        name: err.name,
        status,
    };
    res.status(status).json(body);
});
exports.app.listen(3000);
//# sourceMappingURL=server.js.map