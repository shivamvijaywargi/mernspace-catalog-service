import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "MernSpace Catalog Service",
    description: "This is the API documentation for MernSpace Catalog Service",
  },
  host: "localhost:5502",
  schemas: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = ["../app.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

void swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
