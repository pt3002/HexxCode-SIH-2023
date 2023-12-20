const { AICTEAdminFeatures, Curriculum, Guidelines, CurriculumDevelopers, AdminChart, FeedbackChart } = require("../classes/AICTEAdmin");

exports.getAllDepartmentHeads = async (req, res, next) => {
  try {
    let ans = await AICTEAdminFeatures.getAllDepartmentHeads();
    try {
      let heads = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          email: ans[i].email,
          name: ans[i].name,
          college: ans[i].college,
          department: ans[i].department,
          designation: ans[i].designation,
          creation_date: ans[i].creation_date,
          last_login_date: ans[i].last_login_date,
        };
        heads.push(n);
      }
      res.send({ heads });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addDepartmentHead = async (req, res, next) => {
  try {
    let { id, email, password, name, department, college, designation } =
      req.body;
    let error_flag = false;

    let a = await AICTEAdminFeatures.addDepartmentHead(
      id,
      email,
      password,
      name,
      department,
      college,
      designation
    );
    if (a == "ER_DUP_ENTRY") {
      error_flag = true;
    }

    if (error_flag) {
      res.send({ error: "Email ID of User Already exists" });
    } else {
      res.send({ message: "Users Added Successfully" });
    }
  } catch (error) {
    res.send({ error: "Email ID of User Already exists" });
  }
};

exports.updateDepartmentHead = async (req, res, next) => {
  try {
    let { id, email, name, department, college, designation } = req.body;
    let error_flag = false;

    let a = await AICTEAdminFeatures.updateDepartmentHead(
      id,
      email,
      name,
      department,
      college,
      designation
    );
    if (a == "error") {
      error_flag = true;
    }

    if (error_flag) {
      res.send({ error: "Error while updating Head" });
    } else {
      res.send({ message: "Head Updated Successfully" });
    }
  } catch (error) {
    res.send({ error: "Error while updating Head" });
  }
};

exports.deleteDepartmentHead = async (req, res, next) => {
  try {
    let { ids } = req.body;

    for (let index = 0; index < ids.length; index++) {
      let id = ids[index];
      await AICTEAdminFeatures.deleteDepartmentHead(id);
    }
    res.send({ message: "Heads deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllGuidelines = async (req, res, next) => {
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
};

exports.addGuideline = async (req, res, next) => {
  try {
    let { id, title, description, mongo_file_id } = req.body;
    let error_flag = false;

    let a = await Guidelines.addGuideline(
      id,
      title,
      description,
      mongo_file_id
    );
    if (a == "error") {
      error_flag = true;
    }

    if (error_flag) {
      res.send({ error: "Error Occured while adding guideline" });
    } else {
      res.send({ message: "Guideline added successfully" });
    }
  } catch (error) {
    res.send({ error: "Error Occured while adding guideline" });
  }
};

exports.updateGuideline = async (req, res, next) => {
  try {
    let { id, title, mongo_file_id, last_modified_date } = req.body;
    let error_flag = false;

    let a = await Guidelines.updateGuideline(
      id, title, mongo_file_id, last_modified_date
    );
    if (a == "error") {
      error_flag = true;
    }

    if (error_flag) {
      res.send({ error: "Error while updating Guideline" });
    } else {
      res.send({ message: "Guideline Updated Successfully" });
    }
  } catch (error) {
    res.send({ error: "Error while updating Guideline" });
  }
};

exports.deleteGuideline = async (req, res, next) => {
  try {
    let { id } = req.body;
    await Guidelines.deleteGuideline(id);
    res.send({ message: "Guideline deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};


exports.AICTEAdminLogin=async(req,res,next)=>{
  res.send("admin is working");
}


exports.getAvailableCurriculumDevelopers = async(req, res, next) => {
  try{
    let ans = await CurriculumDevelopers.getAllCD();
    try{
      let allCDs = [];
      for(let i=0; i<ans.length; i++)
      {
        let cd = {
          id: ans[i].id,
          name: ans[i].name,
          email: ans[i].email,
          gender: ans[i].gender,
          university: ans[i].university,
          college: ans[i].college,
          department: ans[i].department,
          status: ans[i].status,
          resume_file_id: ans[i].resume_file_id
        };
        allCDs.push(cd);
      }
      res.send({allCDs});
    }
    catch(error)
    {
      console.log(error);
    }
  }
    catch(error)
    {
      console.log(error);
    }
}

exports.changeCDStatus = async (req, res, next) => {
  try {
    let { id, status} = req.body;
    let error_flag = false;

    let a = await CurriculumDevelopers.changeStatus(
      id, status
    );
    if (a == "error") {
      error_flag = true;
    }
    if (error_flag) {
      res.send({ error: "Error while changing Status" });
    } else {
      res.send({ message: "Status Changed Successfully" });
    }
  } catch (error) {
    res.send({ error: "Error while changing Status" });
  }
};

exports.deleteCD = async (req, res, next) => {
  try {
    let { id } = req.body;
    await CurriculumDevelopers.deleteCD(id);
    res.send({ message: "CD deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.getCDApplicationCountUniversityWise = async (req, res, next) => {
  try {
    let ans = await AdminChart.getCDApplicationCountUniversityWise();
    try {
      let applications = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          university: ans[i].university,
          no_of_applications: ans[i].no_of_applications
        };
        applications.push(n);
      }
      res.send({ applications });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCDApplicationCountGenderWise = async (req, res, next) => {
  try {
    let ans = await AdminChart.getCDApplicationCountGenderWise();
    try {
      let applications = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          gender: ans[i].gender,
          no_of_applications: ans[i].no_of_applications
        };
        applications.push(n);
      }
      res.send({ applications });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
// quality_content, utility content, affectiveness, goals, evaluation
exports.getFeedbackDataDepartmentWise = async (req, res, next) => {
  try {
  let {department} = req.body;
    let ans = await FeedbackChart.getFeedbackDataDepartmentWise(department);
    try {
      let feedbacks = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          quality_content: ans[i].quality_content,
          utility_content: ans[i].utility_content,
          affectiveness: ans[i].affectiveness,
          goals: ans[i].goals,
          evaluation: ans[i].evaluation
        };
        feedbacks.push(n);
      }
      res.send({ feedbacks });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAvailableCurriculum = async(req, res, next) => {
  try{
    let ans = await Curriculum.getAllCurriculum();
    try{
      let allCurriculums = [];
      for(let i=0; i<ans.length; i++)
      {
        let cd = {
          id: ans[i].id,
          department: ans[i].department,
          status: ans[i].status,
          mongo_file_id: ans[i].mongo_file_id
        };
        allCurriculums.push(cd);
      }
      res.send({allCurriculums});
    }
    catch(error)
    {
      console.log(error);
    }
  }
    catch(error)
    {
      console.log(error);
    }
}

exports.changeCurriculumStatus = async (req, res, next) => {
  try {
    console.log("req...",req);
    let { id, status, message } = req.body;
    let error_flag = false;
    console.log("message1", message)
    let a = await Curriculum.changeStatus(
      id, status, message
    );
    if (a == "error") {
      error_flag = true;
    }
    if (error_flag) {
      res.send({ error: "Error while changing Status" });
    } else {
      res.send({ message: "Status Changed Successfully" });
    }
  } catch (error) {
    res.send({ error: "Error while changing Status" });
  }
};

exports.deleteCurriculum = async (req, res, next) => {
  try {
    let { id } = req.body;
    await Curriculum.deleteCurriculum(id);
    res.send({ message: "Curriculum deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};