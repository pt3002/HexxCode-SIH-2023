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

