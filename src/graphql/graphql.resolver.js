import { randomUUID } from "crypto";

export const resolvers = ({ categoryModel, courseModel }) => ({
  async categories() {
    return await categoryModel.list();
  },

  async createCategory({ input: { name, description } }) {
    const category = { id: randomUUID(), name, description };

    await categoryModel.create(category);

    return category;
  },

  async createCourse({ input: { name, description, categoryId } }) {
    const category = await categoryModel.getById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    const course = {
      id: randomUUID(),
      name,
      description,
      categoryId,
      category,
    };

    await courseModel.create(course);

    return course;
  },

  async courses() {
    return await courseModel.list();
  },
});
