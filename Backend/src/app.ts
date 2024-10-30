import express, { Application } from "express";
import appConfig from "./config/app.config";
import connection from "./config/database.config";
import routerAPI from "./router/api";

const app: Application = express();
const port: number = Number(process.env.PORT) || 9999;
const localhost: string = process.env.HOST_NAME || "localhost";

// Configure view engine
appConfig(app);

// Test connection
(async () => {
   try {
      await connection();
      // Set up routes
      app.use("/v1/api", routerAPI);
      app.listen(port, localhost, () => {
         console.log(`Server is running on http://${localhost}:${port}`);
      });
   } catch (error) {
      console.error("Error connecting to the database:", error);
   }
})();
