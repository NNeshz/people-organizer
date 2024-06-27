import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

import userRoute from "./routes/user.routes";

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
