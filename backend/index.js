import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import helmet from 'helmet';
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoute from "./routes/student.route.js";
import courseRoute from "./routes/course.route.js";
import adminRoute from "./routes/admin.route.js";
import enrollRoute from "./routes/enroll.route.js"
dotenv.config()
connectDB()
const app = express();

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
  origin:true,
  credentials:true
}))

const port = 3000;


app.get("/",(req,res)=>{
  res.send("hello world");
})

app.use("/api/student",studentRoute);
app.use("/api/course",courseRoute);
app.use("/api/admin",adminRoute);
app.use("/api/enroll",enrollRoute);
app.listen(port,()=>{
  console.log(`server is listening on port ${port}`);
})