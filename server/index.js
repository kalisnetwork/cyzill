import Express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './api/routes/user.route.js';
import authRouter from './api/routes/auth.router.js';

dotenv.config();

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const app = Express();

// const corsOptions = {
//     origin: 'http://yourfrontenddomain.com',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error details for debugging
    console.error(err);

    // Send the stack trace in a development environment
    let errorDetails = {};
    if (process.env.NODE_ENV === 'development') {
        errorDetails.stack = err.stack;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...errorDetails,
    });
});