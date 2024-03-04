
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/usersRoutes";
import conversationsRoutes from "./routes/conversationsRoutes";
import messagesRoutes from "./routes/messagesRoutes";



const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/conversations", conversationsRoutes);
app.use("/api/v1/messages", messagesRoutes);


app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});