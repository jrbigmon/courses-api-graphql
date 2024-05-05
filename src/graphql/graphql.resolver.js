import { randomUUID } from "crypto";

export const resolvers = ({ categoryModel, courseModel }) => ({
  Query: {
    async categories() {
      return await categoryModel.list();
    },

    async courses() {
      return await courseModel.list();
    },
  },

  Mutation: {
    async createCategory(_, { input: { name, description } }) {
      const category = { id: randomUUID(), name, description };

      await categoryModel.create(category);

      return category;
    },

    async createCourse(_, { input: { name, description, categoryId } }) {
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
  },

  Course: {
    async category(parent) {
      return await categoryModel.getById(parent.categoryId);
    },
  },
});
