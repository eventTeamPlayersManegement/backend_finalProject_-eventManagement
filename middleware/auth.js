import { verifyToken } from "../lib/token.js";


export const authorize = (req, res, next) => {
    const token = req.cookies.loggedIn

    try {
        const verifiedUser = verifyToken(token)
        next()
    } catch (err) {
        res.status(401).redirect("/login")
    }
}

export const loggedIn = (req, res, next) => {
    const token = req.cookies.loggedIn

    try {
        const verifiedUser = verifyToken(token)
        res.redirect("/")
    } catch (err) {
        next()
    }
}