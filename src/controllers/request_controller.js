//Send Connection Request API status:- interested,ignored
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

async function sendRequest(req,res){
    try {
        const toUserId = req.params.toUserId
        const fromUserId = req.user._id
        const status = req.params.status

        //Validating status
        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: "Invalid Status Type: " + status})           
        }

        //Validate- Is request already Exist ??
        const isRequestExist = await ConnectionRequest.findOne({
            $or: [{fromUserId, toUserId},{fromUserId: toUserId, toUserId: fromUserId}]
        })
        if(isRequestExist){
            return res.status(400).json({message: "Request Already Exist"})
        }

        //Validate- toUser really exist or not?
        const isToUserExist = await User.findById(toUserId)
        if(!isToUserExist){
            return res.status(404).send("User Not Found!")
        }

        const connnectionData = await new ConnectionRequest({
        toUserId,
        fromUserId,
        status
    })
        console.log(connnectionData)
        await connnectionData.save()
    
        return res.status(200).json({message: "Request Sent ",
        connnectionData})
    } catch (err) {
        return res.status(400).send("ERROR: " + err.message)
    }
}

module.exports = {
    sendRequest
}