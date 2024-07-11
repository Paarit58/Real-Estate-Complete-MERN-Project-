import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import errorController from "./controllers/errorController.js";
import listingRouter from "./routes/listingRoute.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you need to handle cookies
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRouter);

app.use(errorController);
export default app;
