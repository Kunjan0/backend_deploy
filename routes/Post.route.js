const express=require("express")
const {PostModel}=require("../Models/post.model")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    const query={}  
    try {
        const {device}=req.query

    if(device){
        query.device=device
    }
    const notes=await PostModel.find(query)
    res.send(notes)  
    } catch (error) {
    console.log(error) 
    res.send({"message":"Something went wrong"})
    }
})

postRouter.post("/",async(req,res)=>{
    const payload=req.body
    try{
        const new_post=new PostModel(payload)
        await new_post.save()
        res.send("Post created successfully")
    }
    catch(error){
        console.log(error)
        res.send({"message":"Something went wrong"})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_in_req=req.body.userID
    try {
        if(userID_in_post!==userID_in_req){
            res.send({"message":"You are not authorized to proceed"})
        }
        else{
            await PostModel.findByIdAndUpdate({"_id":id,payload})
            res.send("Updated post successfully")
        }
    } catch (error) {
        console.log(error.message)
        res.send({"message":"Someting is wrong"})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_in_req=req.body.userID
    try {
        if(userID_in_post!==userID_in_req){
            res.send({"message":"You are not authorized to proceed"})
        }
        else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Deleted post successfully")
        }
    } catch (error) {
        console.log(error.message)
        res.send({"message":"Someting is wrong"})
    }
})

module.exports={
    postRouter
}