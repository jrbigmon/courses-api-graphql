# Course API

## About

This project is a simple course and course category API. 
Its purpose is basically to understand the communication between client and server with graphql.

## Libraries
Some basic libraries were used for this project, such as:
- graphql
- express
- apollo server
- cors
- body-parser
- nodemon (development)
- sqlite3 (development)

## Usage

### Clone
```bash
git clone https://github.com/jrbigmon/courses-api-graphql.git
```

### Install all dependencies
```bash
yarn install
```

### Start server
Development mode
```bash
yarn start:dev
```

Production mode
```bash
yarn start
```

## Routes

### Base route
```
http://localhost:3000/graphql?
```

### Full route with methods
```
http://localhost:3000/graphql?query=query%20getCategories%20%7B%0A%20%20categories%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20id%0A%20%20%7D%0A%7D%0A%0Aquery%20getCourses%20%7B%0A%20%20courses%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20categoryId%0A%20%20%20%20category%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A%0Amutation%20createCategory%20%7B%0A%20%20createCategory(input%3A%20%7B%0A%20%20%20%20name%3A%20%22Development%22%2C%0A%20%20%20%20description%3A%20%22Curso%20de%20desenvolvimento%20de%20software%22%0A%20%20%7D)%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D%0A%0Amutation%20createCourse%20%7B%0A%20%20createCourse(input%3A%20%7B%0A%20%20%20%20name%3A%20%22JS%22%2C%0A%20%20%20%20description%3A%20%22Desenvolmento%20de%20software%20em%20javascript%2C%20tanto%20back-end%20como%20front-end.%22%2C%0A%20%20%20%20categoryId%3A%20%22f8c72e78-8e13-4f60-893f-711293c2b8b8%22%0A%20%20%7D)%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D&operationName=getCourses
```

