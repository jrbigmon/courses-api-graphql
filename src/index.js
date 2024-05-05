import express from "express";
import { schema } from "./graphql/graphql.schema.js";
import { resolvers } from "./graphql/graphql.resolver.js";
import { graphqlHTTP } from "express-graphql";
import { dev } from "./db/connection.js";
import { categoryModel } from "./db/models/category.model.js";
import { courseModel } from "./db/models/course.model.js";

const db = await dev();
const app = express();
const port = 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers({
      categoryModel: categoryModel(db),
      courseModel: courseModel(db),
    }),
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
