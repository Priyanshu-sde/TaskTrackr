import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./routes/users.js";
import TodoRoutes from "./routes/todos.js";
import cors from "cors";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://task-trackr-indol.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true
}));

app.options("*", cors());
connectDB();


app.use(express.json());
app.use(userRoutes);
app.use(TodoRoutes);

app.use("/", (req,res) => {
    res.json({message: "Hello there"})
});


app.listen(3000, () => {
  console.log("server on ");
});
