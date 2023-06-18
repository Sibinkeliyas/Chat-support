const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose')

const {
    Server
} = require("socket.io");
app.use(cors());
const index = require('./routes/index');
const { doFindMessage } = require("./helper/findMessage");
const server = http.createServer(app);

mongoose.connect('mongodb+srv://sibinkeliyas:hduRJ9lSpSB6pLSO@cluster0.lbehrvf.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/' , index)
// socket io

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    let count = 0
    socket.on("join_room", (data) => {
        socket.join(data);
        count =   io.sockets.adapter.rooms.get(data).size
    });

    socket.on("join_admin_room", (data) => {
        const message = {
            message : data.author + ' Joined in the chat' ,
            not : true
        }
        socket.to(data.room).emit("receive_message" ,message)
    });

    socket.on('send_message' , (data) =>{
        if(io.sockets.adapter.rooms.get(data.room)?.size > 1 || data.from === 'admin') {
            socket.to(data.room).emit("receive_message", data)
        } else if(data.image){
               const message = {
                message : "I'm not capable to understand this image 😔" ,
                author : 'bot' ,
                time :new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            }
            io.sockets.in(data.room).emit("receive_message" , message)
        } else {
            doFindMessage(data.message).then((res) => {
            const message = {
                message : res.send ,
                author : 'bot' ,
                time :new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            }
            io.sockets.in(data.room).emit("receive_message", message);
        }).catch((err) => {
            const message = {
                message : err ,
                author : 'bot' ,
                time :new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            }
            io.sockets.in(data.room).emit("receive_message" , message)
        })
        }
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3002, () => {
    console.log("SERVER RUNNING");
});