const express                        = require("express");
const mongoose                       = require("mongoose");
const bodyParser                     = require("body-parser");
const path                           = require('path');
const cors                           = require('cors');
const app                            = express();
const http                           = require('http');
const server                         = http.createServer(app);
const { Server }                     = require("socket.io");
const io                             = new Server(server);
const cookieParser                   = require('cookie-parser');
require('dotenv').config();

const routerAuth = require('./routes/auth');
const routerChat = require('./routes/chat');


app.use('/images', express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(cors());

// Routes ********************************
app.use('/auth', routerAuth);
app.use('/chat', routerChat);


// Sockets IO ****************************
let users = [];
io.on('connection', function (socket) {
    console.log(`a user connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// ***************************************

(async function (){
    await mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log(`MongoDB is connected ...`);
            app.listen(process.env.PORT, ()=>{
                console.log(`Server is started in ${process.env.PORT}!`);
            })
        }).catch(err=>{
            console.log(err)
        });
})()