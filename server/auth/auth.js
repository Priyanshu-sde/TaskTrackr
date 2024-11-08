import jwt from 'jsonwebtoken';
const JWT_SECRET = 'NoSecret';


export const generateToken = (id) => {
    return jwt.sign({ id },JWT_SECRET, { expiresIn : '1h'});
}

export const authenticate = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.status(403).json({message:"JWT must be provided"});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message : "Invaild JWT"});
    }
};



