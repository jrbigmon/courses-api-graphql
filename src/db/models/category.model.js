const categoryModel = (db) => {
  const create = ({ id, name, description }) => {
    const sql = `INSERT INTO  categories (id, name, description) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(sql, [id, name, description], function (error) {
        if (error) {
          return reject(error.message);
        }

        return resolve(this.lastID);
      });
    });
  };

  const list = () => {
    const sql = `SELECT * FROM categories;`;

    return new Promise((resolve, reject) => {
      db.all(sql, [], function (error, rows) {
        if (error) {
          return reject(error.message);
        }

        if (!rows || !rows?.length) return resolve([]);

        const categories = rows?.map(({ id, name, description }) => ({
          id,
          name,
          description,
        }));

        resolve(categories);
      });
    });
  };

  return {
    create,
    list,
  };
};

export { categoryModel };
