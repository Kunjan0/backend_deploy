require("dotenv").config()
const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {

        const decoded = jwt.verify(token, "masai");
        console.log("decoded", decoded);
        if (decoded) {
            req.body.userID = decoded.userID;

            next();
        } else {
            res.send({ msg: "Please Login" });
        }
    }

    else {
        res.send({ msg: "Please Login First" });
    }
}

module.exports = { authentication };