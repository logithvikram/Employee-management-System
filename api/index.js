const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./model/User');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('./model/Post');
require('dotenv').config();

const slat = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
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
                    res.cookie('token', token, { httpOnly: true }).json({
                        id: userdoc._id,
                        username
                    });
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
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: "Logout successful" });
});

app.post('/post', upload.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });
        res.json(postDoc);
    });
});

app.get('/post', async (req, res) => {
    res.json(await Post.find().populate('author', ['username']).sort({ createdAt: -1 }));
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
});

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, secret);
        const userId = decoded.id;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await post.remove();

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
