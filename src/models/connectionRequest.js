const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
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

//compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

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