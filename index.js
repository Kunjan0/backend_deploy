const express = require("express")
const {connection} = require("./db")
const { userRouter } = require("./routes/User.route")
const { postRouter } = require("./routes/Post.route")
const { authentication } = require("./Middleware/authentication.middleware")

require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(express.json())

const port = process.env.port

app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome to homepage")
})

app.use("/users", userRouter)
app.use(authentication)
app.use("/posts", postRouter)


app.listen(port, async () => {
    try {
        await connection
        console.log("Connnection succesfule")
    } catch (error) {
        console.log(error)
    }
    console.log("Running at port 8080")
})
