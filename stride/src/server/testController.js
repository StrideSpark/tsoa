"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("@stridespark/tsoa");
let TestController = class TestController extends tsoa_1.Controller {
    async genstring() {
        return { result: 'hi' };
    }
    // @Get()
    // public async literalUnion(): Promise<Eenum> {
    //     return Eenum.a;
    // }
    async discun() {
        return { type: 1, name: 'one' };
    }
};
__decorate([
    tsoa_1.Get(),
    tsoa_1.Security('apikey'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "genstring", null);
__decorate([
    tsoa_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "discun", null);
TestController = __decorate([
    tsoa_1.Route('Controller')
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=testController.js.map