import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet';


import { imageRouter } from './Routes/imgRoute.js';
import { isAuthenticated } from './Authentication/adminAuth.js';
import { formRouter } from './Routes/formRoute.js';
import { adminRouter } from './Routes/adminRoute.js';
import { sideImageRouter } from './Routes/sideBannerRoute.js';

dotenv.config();
const PORT = process.env.PORT
const MONGOURL = process.env.MONGO_URI
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// application middleware here
app.use(imageRouter);
app.use(formRouter)
app.use("/admin", isAuthenticated, adminRouter)
app.use(sideImageRouter);


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});




// db connection
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`connected to Db successfully`);
    })
    .catch((err) => console.error(err));

// port listen
app.listen(PORT, () => console.log(`server started in local host:${PORT}`));
