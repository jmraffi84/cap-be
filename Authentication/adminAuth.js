import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    const token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(400).json({ message: "Invalid Authorization" })
    }
    // console.log(token);

    // const decode = jwt.verify(token, process.env.SECRET_KEY)
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token verification failed" });
        }
        // If verification is successful, attach the decoded payload to the request object
        req.user = decoded;
        next();

    })


}