import express from "express";
import { schema } from "./graphql/graphql.schema.js";
import { resolvers } from "./graphql/graphql.resolver.js";
import { dev } from "./db/connection.js";
import { categoryModel } from "./db/models/category.model.js";
import { courseModel } from "./db/models/course.model.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const db = await dev();
const app = express();
const port = 3000;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers({
    categoryModel: categoryModel(db),
    courseModel: courseModel(db),
  }),
});

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
