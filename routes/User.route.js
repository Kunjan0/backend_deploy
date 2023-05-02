const express=require("express")
const {UserModel}=require("../Models/user.model")
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt")
require("dotenv").config()
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,name,gender}=req.body
    try{
    bcrypt.hash(password,5,async(err,security)=>{
        if(err){
            console.log(err)
        }
        else{
            const user=new UserModel({name,email,gender,password:security})
            await user.save()
            res.send({"message":"User Registered successfully"})
        }
    })    
    }
    catch(error){
        res.send({"message":"Error in registering the user"})
        console.log(error.message)
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    try {
        const user=await UserModel.find({email})
        const hashed_password=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hashed_password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"message":"Login successfull","token":token})
                }
                else{
                    res.send({"message":"Wrong credentials"})
                }
            })
        }
        else{
            res.send({"message":"Credentials are wrong"})

        }
    } catch (error) {
        res.send({"message":"Something went wrong"})
        console.log(error.message)
    }
})
module.exports={userRouter}
