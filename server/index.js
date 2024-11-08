import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./routes/users.js";
import TodoRoutes from "./routes/todos.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

connectDB();

app.use(express.json());
app.use(userRoutes);
app.use(TodoRoutes);

app.listen(3000, () => {
  console.log("server on local host 3000");
});
