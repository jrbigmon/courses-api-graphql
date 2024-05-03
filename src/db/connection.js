import sqlite3 from "sqlite3";

sqlite3.verbose();

const db = new sqlite3.Database(":memory:");

const dbInit = (db) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE categories (
            id string NOT NULL,
            name string NOT NULL, 
            description string NOT NULL,
            PRIMARY KEY (id)
          );`
      );

      db.run(
        `CREATE TABLE courses (
          id string NOT NULL, 
          name string NOT NULL,
          description string NOT NULL,
          category_id string NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (category_id) REFERENCES categories(id)
        );`
      );
    });

    resolve(console.log("Tables created and initialized"));
  });
};

export { db, dbInit };
