
import express, { Application } from "express";
import cors from 'cors';
import session from "express-session";

const appConfig = (app: Application): void => {
   // Middleware để xử lý dữ liệu JSON và form
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(
      session({
         secret: process.env.SESSION_SECRET || "secretKeyOfPobDev",
         resave: false,
         saveUninitialized: true,
         cookie: { secure: false },
      })
   );

   app.use(cors({
      origin: 'http://localhost:4200' // Change if needed
   }));
}
export default appConfig;