"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCategoryDTO_1 = __importDefault(require("../../dto/category/CreateCategoryDTO"));
class UpdateCategoryDTO extends CreateCategoryDTO_1.default {
    constructor(request) {
        super(request);
        this._id = request.id;
    }
}
exports.default = UpdateCategoryDTO;
