import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import chatRoutes from './routes/chat.js';

const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => (
    res.send('API Working')
))

app.use('/api/user', userRouter)
app.use("/api/chat", chatRoutes);

app.listen(PORT, ()=>(
    console.log(`PORT is running on http://localhost:${PORT}`)
))