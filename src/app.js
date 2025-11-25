import express from "express"

const app = express(); // express app created

app.use(express.json());

// routes import
import userRouter from './routes/user.route.js'

// declaring the routes
app.use("/api/v1/users", userRouter);


export default app;