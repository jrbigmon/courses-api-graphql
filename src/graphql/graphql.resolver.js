import { randomUUID } from "crypto";

const providers = {
  categories: [],
  courses: [],
};

export const resolvers = {
  categories() {
    return providers.categories;
  },

  createCategory({ input: { name, description } }) {
    const category = { id: randomUUID(), name, description };

    providers.categories.push(category);

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
};
