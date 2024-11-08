import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../model/users.js';
import { generateToken } from '../auth/auth.js';

const router = express.Router();

router.post('/signup', async (req,res) => {
    const { name , email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        await Users.create({
            name ,
            email,
            password: hashedPassword
        });
        res.json({message: 'You are signed up'});
    }
    catch(error) {
        res.status(400).json({error : 'Email already exist'});
    }
});

router.post('/signin', async (req,res) => {
    const {email,password} = req.body;
    const user = await Users.findOne({email});
    
    if(user && bcrypt.compare(password, user.password)) {
        const token = generateToken(user._id);
        res.json({
            message: 'You are signed in', token
        });
    }
    else{
        res.status(403).json({message:'incorrect credential'});
    }
});

export default router;