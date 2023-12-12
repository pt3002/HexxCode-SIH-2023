// const { response } = require("express");
const { EducatorLogin, EducatorFeatures } = require("../classes/Educator");

exports.EducatorRegistration = async (req, res, next) => {
    try {
        console.log("body....",req.body);
        const { id, email, name, university, college, designation, password } = req.body;
        let existingEducator = await EducatorLogin.findEducatorByEmail(email);
        // console.log(req.body);
        if (existingEducator.length > 0) {
            return res.send({ message:"User with same email already registered" });
        }
        await EducatorFeatures.insertEducator(id, email, name, university, college, designation, password);
        console.log(req.body);
        res.send({
            message: "Educator registration successful",
        });
    } catch (error) {
        // console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// const { jwtSecretKey } = require("../config/configKeys");
// const jwt = require("jsonwebtoken");
// const uuid = require("uuid").v4;

// const generateToken = (user) => {
//     // Create token
//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: user.role,
//       },
//       jwtSecretKey,
//       {
//         expiresIn: "1h",
//       }
//     );
//     return {
//       success: true,
//       token: token,
//     };
// };
// exports.EducatorLogin = async (req, res, next) => {
//     try {
//         let { email, password } = req.body;
//         let ans = await EducatorLogin.findEducatorByEmail(email);
//         if (ans[0].password === password) {
//             let user = { id: ans[0].id, role: "Educator" };
//             const token = generateToken(user);
//             res.send({
//             message: "Login Successful",
//             token: token,
//             });
//         } else {
//             res.send({ error: "Invalid Credentials" });
//         }
//     } catch (error) {
//       console.log(error);
//     }
// };

exports.EducatorLogin=async(req,res)=>{
    // console.log("educator is working");
    try{
        let {email,password}=req.body;
        let ans=await EducatorLogin.findEducatorByEmail(email);
        if(ans.length===0){
            res.send({message:"Wrong user selected or Invalid Credentials"});
        }
        else{
            if(ans[0].password===password){
                // let user={id:ans[0].id,role:"Educator"};
                res.send({
                    message:"Login successful"
                });
            }
            else{
                res.send({error:"Invalid Credentials"});
            }
        }
    }
    catch(error){
        res.status(500).send({ error: "Internal Server Error" });
    }
}