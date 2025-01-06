const express=require('express')
const route=express.Router();

const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')

const USER_SAFE_DATA = 'firstName lastName photoUrl age gender about skills'

//Get all the pending connection request for the loggedIn user
route.get('/user/requests/received', userAuth, async (req, res) => {
    try{
        const loggedInUser=req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName"])  //populate means 
                                                            //[filter]

        res.json({
            message:"Data fetched successfully",
            data:connectionRequests
        })
    }catch(error){

    }
})


route.get('/user/connections',userAuth,async(req,res)=>{
    try{
    
        const loggedInUser=req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:'accepted'},
                {fromUserId:loggedInUser._id,status:'accepted'},
            ]
        })
          .populate('fromUserId',USER_SAFE_DATA)
          .populate('toUserId',USER_SAFE_DATA)

          //console.log()
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
               return row.toUserId
            }
            return row.fromUserId;
        });
        
        res.json({ data })
    }catch(error){
        res.status(400).send({ message: error.message });
    }
})

route.get("/feed",userAuth,async(req,res)=>{
    try{

        // User should see all the user cards except
        // 0 . his own card
        // 1 . his connections
        // 2 . ignored people
        // 3 . already sent the connection request

        const loggedInUser = req.user;

        // =====> /feed?page=1&limit=10

        const page = parseInt(req.query.page) || 1;
        let limit  = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1) * limit;

        //Find all connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId  toUserId")


        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        //console.log(hideUsersFromFeed);
        const users = await User.find({
            $and:[
                { _id: { $nin : Array.from(hideUsersFromFeed)}},
                { _id: { $ne : loggedInUser._id }},
            ],
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit)
        
        res.json({
            data:users
        })
    }
    catch(error){
        res.status(400).json({ message: err.message });
    }
})


module.exports=route;
