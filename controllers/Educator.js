const { jwtSecretKey } = require("../config/configKeys");
const jwt = require("jsonwebtoken");
const {
  EducatorLogin,
  EducatorFeatures,
  Guidelines,
} = require("../classes/Educator");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    jwtSecretKey
  );
  return {
    success: true,
    token: token,
  };
};

exports.EducatorRegistration = async (req, res, next) => {
  try {
    console.log("body....", req.body);
    const { id, email, name, university, college, designation, password } =
      req.body;
    let existingEducator = await EducatorLogin.findEducatorByEmail(email);
    // console.log(req.body);
    if (existingEducator.length > 0) {
      return res.send({ message: "User with same email already registered" });
    }
    await EducatorFeatures.insertEducator(
      id,
      email,
      name,
      university,
      college,
      designation,
      password
    );
    console.log(req.body);
    res.send({
      message: "Educator registration successful",
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getAllGuidelines = async (req, res, next) => {
  //later auth to be added here
  if(true){
    //console.log(req.userId, req.userRole, req.userName, req.email)
    try {
      let ans = await Guidelines.getAllGuidelines();
      try {
        let guidelines = [];
        for (let i = 0; i < ans.length; i++) {
          let n = {
            id: ans[i].id,
            title: ans[i].title,
            description: ans[i].description,
            mongo_file_id: ans[i].mongo_file_id,
            creation_date: ans[i].creation_date,
            last_modified_date: ans[i].last_modified_date,
          };
          guidelines.push(n);
        }
        res.send({ guidelines });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
};


exports.EducatorLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let ans = await EducatorLogin.findEducatorByEmail(email);
    if (ans[0].password === password) {
      let user = {
        id: ans[0]["id"],
        role: "Educator",
        name: ans[0]["name"],
        email: email,
      };
      const token = generateToken(user);
      res.send({
        message: "Login Successful",
        token: token,
      });
    } else {
      res.send({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};


