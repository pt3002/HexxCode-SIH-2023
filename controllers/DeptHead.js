const { Groups } = require("../classes/DeptHead");

exports.getAllSubjectNamesByDepartment = async (req, res, next) => {
  try {
    let { department } = req.body;
    let ans = await Groups.getAllSubjectNamesByDepartment(department);
    try {
      let subjects = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          department: ans[i].department,
          subject_name: ans[i].subject_name,
          creation_date: ans[i].creation_date,
        };
        subjects.push(n);
      }
      res.send({ subjects });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addGroup = async (req, res, next) => {
  try {
    let { id, department, subject_name } = req.body;
    let error_flag = false;
    console.log(id, department, subject_name)
    let a = await Groups.addGroup(id, department, subject_name);
    console.log(a)
    if (a == "error") {
      error_flag = true;
    }

    if (error_flag) {
      res.send({ error: "Error while adding group" });
    } else {
      res.send({ message: "Group Added Successfully" });
    }
  } catch (error) {
    res.send({ error: "Error while adding group" });
  }
};
