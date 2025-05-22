"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_1 = require("../models/category");
const DEFAULT_CATEGORIES = [
    category_1.EssentialCategory.Maintenance,
    category_1.EssentialCategory.Transport,
    category_1.EssentialCategory.Groceries,
    category_1.EssentialCategory.House,
    category_1.EssentialCategory.HouseUtilities,
    category_1.EssentialCategory.PersonalCareAndMedicine,
    category_1.EssentialCategory.Sport,
    category_1.NonEssentialCategory.Entertainment,
    category_1.NonEssentialCategory.EatingOut,
    category_1.NonEssentialCategory.Clothes,
];
let CategoryService = class CategoryService {
    categories = [...DEFAULT_CATEGORIES];
    create(createCategoryDto) {
        this.categories.push(createCategoryDto.text);
        return this.categories;
    }
    findAll() {
        return this.categories;
    }
    findOne(id) {
        return this.categories[id];
    }
    update(id, updateCategoryDto) {
        this.categories[id] = updateCategoryDto.text;
        return this.categories;
    }
    remove(id) {
        this.categories.splice(id, 1);
        return this.categories;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)()
], CategoryService);
//# sourceMappingURL=category.service.js.map