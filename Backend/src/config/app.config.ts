import express, { Application } from "express";
import session from "express-session";
import http from "http";
import cors from "cors";

import dotenv from 'dotenv';
dotenv.config();

const appConfig = (app: Application, httpServer: http.Server): void => {
   // Middleware xử lý JSON 
   app.use(express.json());
   // Middleware này giúp Express xử lý dữ liệu form gửi qua HTTP
   app.use(express.urlencoded({ extended: true }));

   // Middleware cho session
   app.use(session({
      secret: process.env.SESSION_SECRET || 'Default',
      resave: false,
      saveUninitialized: true,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   }));

   // Middleware cho CORS
   app.use(
      cors({
         origin: process.env.CORS_ORIGIN,
         optionsSuccessStatus: 200,
         credentials: true,
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
         allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
         exposedHeaders: ['Authorization'],
         preflightContinue: false,
         maxAge: 60 * 60 * 24 * 365 * 1000,
      })
   )
};

export default appConfig;
