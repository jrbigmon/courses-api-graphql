const courseModel = (db) => {
  const create = ({ id, name, description, categoryId }) => {
    const sql = `INSERT INTO courses (id, name, description, category_id) VALUES (?, ?, ?, ?);`;

    return new Promise((resolve, reject) => {
      db.run(sql, [id, name, description, categoryId], function (error) {
        if (error) {
          console.error(error);
          return reject(error.message);
        }

        return resolve(this.lastID);
      });
    });
  };

  const list = () => {
    const sql = `
      SELECT
        c.id courseId,
        c.name courseName,
        c.description courseDescription,
        category.id categoryId,
        category.name categoryName,
        category.description categoryDescription 
      FROM courses c
      INNER JOIN categories category ON category.id = c.category_id;
    `;

    return new Promise((resolve, reject) => {
      db.all(sql, [], function (error, rows) {
        if (error) {
          console.error(error);
          return reject(error.message);
        }

        if (!rows || !rows?.length) return resolve([]);

        const courses = rows?.map(
          ({
            courseId,
            courseName,
            courseDescription,
            categoryId,
            categoryName,
            categoryDescription,
          }) => ({
            id: courseId,
            name: courseName,
            description: courseDescription,
            categoryId: categoryId,
            category: {
              id: categoryId,
              name: categoryName,
              description: categoryDescription,
            },
          })
        );

        resolve(courses);
      });
    });
  };

  return {
    create,
    list,
  };
};

export { courseModel };
