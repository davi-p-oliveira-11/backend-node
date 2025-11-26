import express from "express"

const app = express(); // express app created

app.use(express.json());

// routes import
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

// declaring the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// remember to add jsonwebtokens


export default app;