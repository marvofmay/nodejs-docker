"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCategoryDTO {
    constructor(request) {
        this.name = request.name;
        this.description = request.description;
    }
}
exports.default = CreateCategoryDTO;
