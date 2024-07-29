import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // Import cookie-parser
import { User } from "./models/User.js"; // Ensure this path is correct
import ws, { WebSocketServer ,WebSocket} from "ws";

dotenv.config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt_secret = process.env.JWT_SECRET;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

// Register Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if (passOk) {
            jwt.sign({ userId: foundUser._id, username }, jwt_secret, {}, (err, token) => {
                res.cookie('token', token).json({

                    id: foundUser._id,
                });
            });
        }
        else{
            res.sendStatus(404)
        }
    }
});
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        // Create user document
        const UserDoc = await User.create({ username: username, password: hashedPassword });

        // Generate JWT
        jwt.sign({ userId: UserDoc._id, username }, jwt_secret, {}, (err, token) => {
            if (err) {
                console.error("JWT signing error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            // Set cookie and respond
            res.cookie("token", token, { httpOnly: true }).status(200).json({
                id: UserDoc._id,
                username
            });
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Profile Endpoint
app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(202).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, jwt_secret, (err, userdata) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.status(401).json({ message: 'Invalid token' });
            }
            res.json(userdata);
        });
    } catch (error) {
        console.error("Profile retrieval error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start Server
const server = app.listen(4040, () => {

    console.log("Server running on port 4040");
});

const wss = new WebSocketServer({ server });
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    
    const tokenCookieString = cookies.split(";").find(str => str.trim().startsWith("token"))
    if(tokenCookieString){
        const token = tokenCookieString.split("=")[1];
        if(token){
            jwt.verify(token,jwt_secret,{},(err,userInfo)=>{
                if (err) throw err
                const {userId,username} = userInfo;
                connection.userId = userId;
                connection.username = username;
            })
        }
    }

    connection.on("message",(message)=>{
        const data = JSON.parse(message.toString())
        console.log(data)
    // const {message} = data;
    const {reciptant,text} = data;
    
    if(reciptant && text){
        [...wss.clients].filter(client => client.userId === reciptant ).forEach(c => c.send(JSON.stringify({text,sender:connection.userId})))
    }

    console.log("done")
    })
    wss.clients.forEach((client) => {
        
        client.send(JSON.stringify({
          online:  [...wss.clients].map((c)=>({userId:c.userId,username:c.username}))

        }
        ))
      });
      
})

