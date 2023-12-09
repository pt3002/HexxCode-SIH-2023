const { AICTEAdminFeatures } = require("../classes/AICTEAdmin");

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
    let { id, email, password, name, department, college, designation } = req.body;
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
