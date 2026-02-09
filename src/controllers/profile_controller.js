// viewUser API
async function viewUserProfile(req,res) {
    try {
        const user = await req.user;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
}

module.exports = {viewUserProfile}