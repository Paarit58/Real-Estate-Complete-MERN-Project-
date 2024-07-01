import express from "express";
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRouter.js";
import errorController from "./controllers/errorController.js";
import listingRouter from "./routes/listingRoute.js";



const app= express();

app.use(express.json())
app.use(cookieParser());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/listing',listingRouter)

app.use(errorController);
export default app;
