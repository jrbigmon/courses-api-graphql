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
    const sql = `SELECT * FROM courses;`;

    return new Promise((resolve, reject) => {
      db.all(sql, [], function (error, rows) {
        if (error) {
          console.error(error);
          return reject(error.message);
        }

        if (!rows || !rows?.length) return resolve([]);

        const courses = rows?.map(({ id, name, description, category_id }) => ({
          id,
          name,
          description,
          categoryId: category_id,
        }));

        resolve(courses);
      });
    });
  };

  const listByCategoryId = (categoryId) => {
    const sql = `SELECT * FROM courses WHERE category_id = ?;`;

    return new Promise((resolve, reject) => {
      db.all(sql, [categoryId], function (error, rows) {
        if (error) {
          console.error(error);
          return reject(error.message);
        }

        if (!rows || !rows?.length) return resolve([]);

        const courses = rows?.map(({ id, name, description, category_id }) => ({
          id,
          name,
          description,
          categoryId: category_id,
        }));

        resolve(courses);
      });
    });
  };

  return {
    create,
    list,
    listByCategoryId,
  };
};

export { courseModel };
