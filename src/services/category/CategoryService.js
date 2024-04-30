const Category = require('../../models/category');

class CategoryService {
    async createCategory(createCategoryDTO) {
        try {
            const category = new Category({
                name: createCategoryDTO.name,
                description: createCategoryDTO.description,
            });
            const result = await category.save();

            if (result) {
                return { success: true, message: 'Category saved successfully.' };
            } else {
                return { success: false, message: 'Category not saved.' };
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to create category.');
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
                return { success: true, message: 'Category updated successfully' };
            } else {
                return {success: false, message: 'Category not found or not updated'};
            }
        } catch (err) {
            console.error(err);

            throw new Error('Failed to update category.');
        }
    }

    async deleteCategory (categoryId) {
        try {
            const result = await Category.findByIdAndDelete(categoryId, null);
            if (result) {
                return { success: true, message: 'Category deleted successfully.' };
            } else {
                return { success: false, message: 'Category not found.' };
            }
        } catch (err) {
            console.error(err);

            throw new Error('Failed to delete category.');
        }
    }
}

module.exports = CategoryService;