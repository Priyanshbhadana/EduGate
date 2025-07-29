import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config({
  path: './.env'
});

const app = express();

//mongoose.connect("mongodb+srv://priyanshubhadana7900:<rdbIf7d6GOTWnfvp>@in-out-system.rsyyxsp.mongodb.net/?retryWrites=true&w=majority&appName=in-out-system")

// ✅ Fixed: credentials should be lowercase
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import registerRouter from './routes/register.route.js';
import homeRouter from './routes/home.route.js';

app.use("/api/v1/register", registerRouter);
app.use("/api/v1/home", homeRouter);

export default app;
