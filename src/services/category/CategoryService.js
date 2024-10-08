const Category = require('../../models/category');
const categoryTransformer = require("../../repositories/api/v1/category/transformer/categoryTransformer");

class CategoryService {
    async createCategory(createCategoryDTO) {
        try {
            const category = new Category({
                name: createCategoryDTO.name,
                description: createCategoryDTO.description,
            });
            const result = await category.save();

            if (result) {
                return {
                    success: true,
                    message: 'Category saved successfully',
                    category: result
                };
            } else {
                return {
                    success: false,
                    message: 'Category not saved'
                };
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to create category');
        }
    }

    async updateCategory(updateCategoryDTO) {
        try {
            const categoryId = updateCategoryDTO._id;
            const newData = {
                name: updateCategoryDTO.name,
                description: updateCategoryDTO.description,
            }
            const result = await Category.updateOne({_id: categoryId}, {$set: newData});
            if (result.modifiedCount === 1) {
                let category =  await Category.findById(categoryId);
                category = categoryTransformer(category);

                return {
                    success: true,
                    message: 'Category updated successfully',
                    category: category,
                };
            } else {
                return {
                    success: false,
                    message: 'Category not found or not updated'
                };
            }
        } catch (err) {
            console.error(err);

            throw new Error('Failed to update category');
        }
    }

    async deleteCategory (categoryId, safe = true) {
        try {
            const category = await Category.findById(categoryId);
            if (! category) {
                return {
                    success: false,
                    message: 'Category not found',
                    status: 404
                };
            }

            if (safe) {
                await Category.findByIdAndUpdate(
                    categoryId,
                    {deletedAt: Date.now()},
                    {new: true}
                );
            } else {
                await Category.findByIdAndDelete(categoryId);
            }

            return {
                success: true,
                message: 'Category marked as deleted successfully',
                status: 200
            };
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: 'Failed to delete category',
                status: 500
            };
        }
    }

    async restoreCategory (categoryId) {
        try {
            const category = await Category.findById(categoryId);
            if (! category) {
                return {
                    success: false,
                    message: 'Category not found',
                    status: 404
                };
            }

            await Category.findByIdAndUpdate(
                categoryId,
                {deletedAt: null, updatedAt: Date.now()},
                {new: true}
            );

            return {
                success: true,
                message: 'Category restored successfully',
                status: 200
            };
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: 'Failed to restore category',
                status: 500
            };
        }
    }
}

module.exports = CategoryService;