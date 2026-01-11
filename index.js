import express from 'express'
import cors from "cors";

import taskRoutes from "./routes/taskRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connection from "./config/db.js";
import userRoute from "./routes/userRoute.js"

// call connection function
connection();

const app = express();
app.use(express.json());
app.use(cors())
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);


// user rotues
app.use('/api/user',userRoute)
app.use(errorHandler);

// creating a server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`.bold.yellow);
});
