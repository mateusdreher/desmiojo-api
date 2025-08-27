import express from "express";
import { userRouter } from "./modules/users/routes";
import { recipeRouter } from "./modules/recipes/routes";
import { healthRouter } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", healthRouter);
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);

//app.use(errorHandler);
//app.use(error404Handler);
export { app };
