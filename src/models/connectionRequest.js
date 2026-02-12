const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "accepted", "rejected", "interested"],
            message: `{VALUE} is incorrect status type`
        },
        required: true
    }
},{timestamps: true})

//A pre-middleware checks Is user sending request to himself
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Invalid Connection Request!")
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequest