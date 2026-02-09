const {validateEditProfileData} = require('../utils/validation')

// viewUser API
async function viewUserProfile(req,res) {
    try {
        const user = await req.user;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
}

// editUser API
async function editUserProfile(req,res){
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit requests")
        }         
        const loggedInUser = req.user
        
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await  loggedInUser.save();
        res.status(200).json({message: `${loggedInUser.firstName}, your profile updated Successfully!`,
        data: loggedInUser,
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
}

module.exports = {viewUserProfile, editUserProfile}