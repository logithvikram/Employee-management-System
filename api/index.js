const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./model/User')
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const slat = bcrypt.genSaltSync(10);
const secret = "ajdbfujvsadfjbajsdb";

app.use(cookieParser())

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

mongoose.connect('mongodb+srv://logithvikram:9weYW3jRprEUNn3w@cluster0.miuoodu.mongodb.net/user')
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("MongoDB connection error:", error));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userdoc = await User.create({
            username,
            password: bcrypt.hashSync(password, slat)
        });
        res.json(userdoc);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ message: "Registration failed" });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userdoc = await User.findOne({ username });
        if (!userdoc) {
            return res.status(400).json({ message: "User not found" });
        }
        const check = bcrypt.compareSync(password, userdoc.password);
        if (check) {
            jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
                if (err) {
                    console.error("JWT signing error:", err);
                    res.status(500).json({ message: "Internal server error" });
                } else {
                    res.cookie('token', token, { httpOnly: true }).json({ id:userdoc._id,
                    username});
                }
            });
        } else {
            res.status(400).json({ message: "Wrong credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token','').json({ message: "Logout successful" });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// MONGODB_URI=mongodb+srv://logithvikram:9weYW3jRprEUNn3w@cluster0.miuoodu.mongodb.net/blog

