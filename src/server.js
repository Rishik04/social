import express from "express"
import * as dotenv from "dotenv"
import userRouter from "./Routes/userRoute.mjs";
import postRouter from "./Routes/postRoute.mjs"
// import * as auth from "./auth/auth.mjs"
import cors from "cors";
import * as db from "./db/db.js";
import path from "path"

dotenv.config();
const __dirname=path.resolve()
const app = express();
const PORT=process.env.PORT;


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/src/views'))

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/src/public')))

app.use("/user", userRouter);
app.use("/post", postRouter)




app.get('/', function (req, res) {
  return res.render('index');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
})