import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import adminRoutes from './routes/admin';
import chatsRoutes from './routes/chats';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
const cors = require('cors');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'UI/views'));

app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'UI/public')));

app.use('/admin', adminRoutes);
app.use(chatsRoutes);
app.use(authRoutes);

io.on('connection', (socket) => {
  
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('message',(msg)=>{
        console.log('message : ' + msg);
        io.emit('message', msg);
    })
});

server.listen(process.env.PORT, ():void=>{
    console.log("Server Running");
});
