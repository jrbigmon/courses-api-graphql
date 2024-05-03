import { randomUUID } from "crypto";

const providers = {
  categories: [],
  courses: [],
};

export const resolvers = ({ categoryModel, courseModel }) => ({
  async categories() {
    return await categoryModel.list();
  },

  async createCategory({ input: { name, description } }) {
    const category = { id: randomUUID(), name, description };

    await categoryModel.create(category);

    return category;
  },

  createCourse({ input: { name, description, categoryId } }) {
    const category = providers.categories.find(
      (categoryInDB) => (categoryInDB.id = categoryId)
    );

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

    providers.courses.push(course);

    return course;
  },

  courses() {
    return providers.courses;
  },
});
