const { jwtSecretKey } = require("../config/configKeys");
const jwt = require("jsonwebtoken");
const {
  EducatorLogin,
  EducatorFeatures,
  Guidelines,
  Requirements,
  Feedback,
  EducatorNotification,
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
  if(true){
    try {
      let ed_id= req.userId;
      let educator= await EducatorLogin.findEducatorById(ed_id);
    if(educator.length===0){
      res.send({
        message:"This User Cannot View Guidelines",
      });
    }else{
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
    console.log("ans..",ans);
    if (ans[0].password === password) {
      let user = {
        id: ans[0]["id"],
        role: "Educator",
        name: ans[0]["name"],
        email: email,
      };
      console.log("user ..",user);
      const token = generateToken(user);
      console.log("token...",token);
      res.send({
        message: "Login Successful",
        token: token,
        role: "Educator",
      });
    } else {
      res.send({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.EducatorAuth = async (req, res, next) => {
  if (req.userRole == "Educator") {
    if (req.userRole === req.body.decodedRole) {
      let ans = await EducatorLogin.findEducatorById(req.userId);
      if (ans.length > 0) {
        res.send({
          message: "Token Validated",
          id: ans[0]["id"],
          role: "Educator",
          name: ans[0]["name"],
          email: ans[0]["email"],
        });
      }
    }
  }
};
exports.EducatorRequirement=async(req,res,next)=>{
  try{
    let educator_id = req.userId;
    let {id,department,subject,requirement_text}=req.body;
    let educator= await EducatorLogin.findEducatorById(educator_id);
    if(educator.length===0){
      res.send({
        message:"This User Cannot Post Requirement",
      });
    }
    else{
      await Requirements.insertEducatorRequirement(
        id,
        department,
        subject,
        educator_id,
        requirement_text,
      );
      console.log(req.body);
      res.send({
        message: "Requirement Posted Successfully",
      });
    }
  }
  catch (error) {
    console.log(error);
  }
  
};

//auth to be added
exports.getRequirements=async(req,res,next)=>{
  try{
    // let ed_id=req.params.educatorId.toString();
    let ed_id= req.userId;
    // console.log(ed_id,typeof(ed_id));
    let ans=await Requirements.getEducatorRequirements(ed_id);
    console.log(ans);
    try {
      let requirements = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          RowNum:ans[i].RowNum,
          id: ans[i].id,
          department: ans[i].department,
          subject: ans[i].subject,
          requirement_text:ans[i].requirement_text,
        };
        requirements.push(n);
      }
      res.send({ requirements });
    } catch (error) {
      console.log(error);
    }
  }
  catch (error) {
    console.log(error);
  }
}

exports.EducatorDeleteRequirement = async (req, res, next) => {
  try {
    let educator_id = req.userId;
    console.log(educator_id);
    let { ids } = req.body;
    console.log("id...",ids);
    console.log(ids);
    let educator= await EducatorLogin.findEducatorById(educator_id);
    if(educator.length===0){
      res.send({
        message:"This User Cannot Delete Requirement",
      });
    }
    else{
    for (let index = 0; index < ids.length; index++) {
      let id = ids[index];
      await Requirements.deleteRequirement(id);
      console.log("deleted");
    }
    res.send({ message: "Requirements deleted successfully" });
  }
  } catch (error) {
    console.log(error);
  }
};

exports.EducatorPostFeedback=async(req,res,next)=>{
  try{
    let educator_id = req.userId;
    let {id,department,quality_content,utility_content,affectiveness,goals,evaluation,feedback_message}=req.body;
    let educator= await EducatorLogin.findEducatorById(educator_id);
    if(educator.length===0){
      res.send({
        message:"This User Cannot Post Feedback",
      });
    }
    else{
      const dept = req.params && req.params.id;
      console.log("dept..",dept);
      let present_feedback=await Feedback.findFeedback(educator_id,dept);
      console.log("if present...",present_feedback);
      console.log("length...",present_feedback.length);
      if(present_feedback.length !== 0){
        res.send({
          message:"You can only post one Feedback per Curriculum"
        })
      }else{
      await Feedback.insertEducatorFeedback(
        id,
        department,
        educator_id,
        quality_content,
        utility_content,
        affectiveness,
        goals,
        evaluation,
        feedback_message
      );
      res.send({
        message: "Feedback Saved Successfully",
      });
    }
  }}
  catch (error) {
    console.log(error);
  }
};

exports.getNotificationsByUserId = async (req, res, next) => {
  try {
    let user_id = req.userId;
    let notifications = await EducatorNotification.getNotificationsByEducatorId(
      user_id
    );
    res.send({ notifications });
    //console.log(notifications);
  } catch (error) {
    console.log(error);
  }
};
 
exports.getNotificationsByUserId = async (req, res, next) => {
      try {
        let user_id = req.userId;
        let notifications = await EducatorNotification.getNotificationsByEducatorId(
          user_id
        );
        res.send({ notifications });
        //console.log(notifications);
      } catch (error) {
        console.log(error);
      }
    };
exports.setNotificationSeen = async (req, res, next) => {
  try {
    let { user_id, user_token } = req.body;
    await EducatorNotification.setNotificationSeen(user_id);
    res.send({ message: "Notification seen status updated" });
    console.log("Hello...")
  } catch (error) {
    console.log(error);
  }
};

exports.getCurriculum=async(req,res,next)=>{
  try{
      let curriculum = [];
      let ans=await EducatorFeatures.getAllCurriculum();
      console.log(ans);
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          department: ans[i].department,
          mongo_file_id: ans[i].mongo_file_id,
        };
        curriculum.push(n);
      }
      console.log(curriculum);
      res.send({ curriculum });
  }
  catch (error) {
    console.log(error);
  }
}

exports.deleteNotification = async (req, res, next) => {
  try {
    const { user_id, guideline_id } = req.body;
    await EducatorNotification.deleteNotification(user_id, guideline_id);
    res.send({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}
  
