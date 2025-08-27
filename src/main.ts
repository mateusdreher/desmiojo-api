import express from "express";
import { userRouter } from "./modules/users/routes";
import { recipeRouter } from "./modules/recipes/routes";
import { healthRouter } from "./routes";
import { errorHandler } from "./modules/__shared__/infrastructure/http/middlewares/error.middleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", healthRouter);
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);

app.use(errorHandler);
export { app };
