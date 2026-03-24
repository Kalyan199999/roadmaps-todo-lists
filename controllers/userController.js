const User = require('../collections/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { 
    isEmpty,
    isValidEmail,
    isValidPassword
} = require('../utils/commonCode')

const getUsers = async (req,res)=>
{
    try 
    {
        const data = await User.find({})

        return res.status(200).json({
            ok:true,
            data:data
        })
    } 
    catch (error) 
    {
        return res.status(400).json({
            ok:false,
            message:error.message
        })
    }
}


const register = async (req,res)=>
{
    
    try 
    {
        const { name , email , password } = req.body;

        if( !isEmpty(name) || !isEmpty(email) || !isEmpty(password) ) 
        {
            return res.status(400).json({
                ok:false,
                message:"All fields are required!"
            })
        }

        if( !isValidEmail(email) )
        {
            return res.status(400).json({
                ok:false,
                message:"Invalid email!"
            })
        }

        if( !isValidPassword(password) )
        {
            return res.status(400).json({
                ok:false,
                message:"Invaliid password"
            })
        }

        const salt = process.env.SALT | 10;

        const hashPassword = await bcrypt.hash( password , salt );
 
        const newUser = User({
            username:name,
            email:email,
            password:hashPassword,
        })
        await newUser.save()

         const SECRETE_KEY = process.env.SECRETE_KEY;

        const payload = {
            email:email,
            id:newUser._id
        }

        const options = {expiresIn:'1h'};
        
        const token = jwt.sign( payload ,secretOrPrivateKey=SECRETE_KEY, options )
        
        return res.status(200).json({
            ok:true,
            user:{
                id:newUser._id,
                name:newUser.username,
                email:newUser.email
            },
            token,
            
        })
    } 
    catch (error) 
    {
        return res.status(400).json({
            ok:false,
            message:error.message
        })
    }
}

const login = async (req,res)=>
{
    try 
    {
        const {email,password} = req.body;

        if( !isEmpty(email) || !isEmpty(password) )
        {
            return res.status(200).json({
                ok:false,
                message:"Email and Password is required!"
            })
        }

        if( !isValidEmail(email) )
        {
            return res.status(200).json({
                ok:false,
                message:"Invalid Email!"
            })
        }

        const user = await User.findOne({email:email});

        if( !user )
        {
            return res.status(400).json({
                ok:false,
                message:"User not found!"
            })
        }

        const hashPassword = user.password;

        const istrue = await bcrypt.compare( password , hashPassword )

        if( !istrue )
        {
            return res.status(400).json(
                {
                    ok:false,
                    message:"Invalid Password!"
                }
            )
        }

        const SECRETE_KEY = process.env.SECRETE_KEY;

        const payload = {
            email:email,
            id:user._id
        }

        const options = {expiresIn:'1h'};

        const token = jwt.sign( payload,SECRETE_KEY,options )
        
        return res.status(200).json(
            {
                ok:true,
                user:{
                    id:user._id,
                    name:user.username,
                    email:user.email
                },
                token,
            }
        )
    } 
    catch (error) 
    {
        return res.status(400).json({
            ok:false,
            message:error.message
        })
    }
}

module.exports = {
    getUsers,
    register,
    login
}