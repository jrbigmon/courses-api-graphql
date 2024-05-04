const categoryModel = (db) => {
  const create = ({ id, name, description }) => {
    const sql = `INSERT INTO  categories (id, name, description) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(sql, [id, name, description], function (error) {
        if (error) {
          console.error(error);
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
          console.error(error);
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

  const getById = (id) => {
    const sql = `SELECT * FROM categories WHERE id = ?;`;

    return new Promise((resolve, reject) => {
      db.get(sql, [id], function (error, row) {
        if (error) {
          console.error(error);
          return reject(error.message);
        }

        if (!row) return resolve(null);

        const { id, name, description } = row;

        resolve({
          id,
          name,
          description,
        });
      });
    });
  };

  return {
    create,
    list,
    getById,
  };
};

export { categoryModel };
