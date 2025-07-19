import jwt from "jsonwebtoken";


export const generetTokenAndSetCookie = (userId, isAdmin, res) => {

    // create jwt token with userId payload and expire date
    const token = jwt.sign({userId, isAdmin}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION || '15d'
    })

    // set jwt token in a cookie name 'jwt'
    res.cookie("access_token", token, {
        // 15 days in milliseconds
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // cookie inaccessible to client-side JS
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // use HTTPS in production
    })
}