import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import chatsRoutes from './routes/chats';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
const cors = require('cors');
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'UI/views'));

app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'UI/public')));

app.use('/admin', adminRoutes);
app.use(chatsRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, ():void=>{
    console.log("Server Running");
})

