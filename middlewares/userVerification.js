const jwt = require("jsonwebtoken")

const verification = (req,res,next)=>
{
    try 
    {
        // get the secrete key
        const SECRETE_KEY = process.env.SECRETE_KEY;

        // Get the authorization header value, e.g., "Bearer <token>"
        const authHeader = req.headers.authorization;

        // Check if the header exists and has the "Bearer " format
        if (!authHeader || !authHeader.startsWith('Bearer ')) 
        {
            return res.status(401).json({
                ok:false,
                message: "No token provided, authorization failed" 
            });
        }

        // Extract the token part by splitting the header string
        const token = authHeader.split(' ')[1];
        

        // Verify the token using the secret key (synchronous version)
        // If the signature is invalid or the token expired, it will throw an error
        const decoded = jwt.verify( token , SECRETE_KEY )


        // Attach the decoded user information to the request object for use in subsequent middleware/route handlers
        req.user = decoded;

        // Call the next middleware/route handler in the stack
        next();
    } 
    catch (error) 
    {
        // Handle specific errors like "TokenExpiredError" or "JsonWebTokenError"
        if (error.name === 'TokenExpiredError') 
        {
            return res.status(401).json({
                ok:false,
                message: 'Token expired.Please Login again' 
            });
        }
        return res.status(403).json({
             ok:false,
            message: "Invalid token" 
        });
    }
}

module.exports = verification