const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

const emailps = "danish@gmail.com";
const passwordps = "123";

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password }, req.body);

    if (email === emailps && password === passwordps) {
        res.send("login successful");

    } else {
        res.send("login failed");
    }
})

app.use("/api", require("./routes/user.routes"));


const PORT = process.env.PORT || 3002;

// MongoDB connection
mongoose
    .connect("mongodb://localhost:27017/newdb")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });