import sqlite3 from "sqlite3";
import { resolve } from "path";

const dbInit = (sqlite3) => {
  const test = async () => {
    sqlite3.verbose();
    const database = new sqlite3.Database(":memory:");

    await new Promise((resolve) => {
      database.serialize(() => {
        database.run(
          `CREATE TABLE categories (
              id string NOT NULL,
              name string NOT NULL, 
              description string NOT NULL,
              PRIMARY KEY (id)
            );`
        );

        database.run(
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

    return database;
  };

  const prod = async () => {
    sqlite3.verbose();
    const database = new sqlite3.Database(
      resolve("src", "db", "database.sqlite")
    );

    await new Promise((resolve) => {
      database.serialize(() => {
        database.run(
          `CREATE TABLE IF NOT EXISTS categories (
              id string NOT NULL,
              name string NOT NULL, 
              description string NOT NULL,
              PRIMARY KEY (id)
            );`
        );

        database.run(
          `CREATE TABLE IF NOT EXISTS courses (
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

    return database;
  };

  return {
    test,
    prod,
  };
};

const { test, prod } = dbInit(sqlite3);

export { test, prod };
