const { Groups, DeptHeadLogin } = require("../classes/DeptHead");
const { jwtSecretKey } = require("../config/configKeys");
const jwt = require("jsonwebtoken");

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

exports.DeptHeadLogin = async (req, res) => {
    try {
      let { email, password } = req.body;
      let ans = await DeptHeadLogin.findDeptHeadByEmail(email);
      console.log("ans...", ans);
      if (ans.length === 0) {
        res.send({ message: "Wrong user selected or Invalid Credentials" });
      } else {
        if (ans[0].password === password) {
          let user = {
            id: ans[0]["id"],
            role: "DepartmentHead",
            name: ans[0]["name"],
            email: email,
          };
          console.log("user...",user);
          const token = generateToken(user);
          console.log(token)
          res.send({
            message: "Login Successful",
            token: token,
            role: "DepartmentHead",
          });
        } else {
          res.send({ error: "Invalid Credentials" });
        }
      }
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  };

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

exports.getMembersNotInGivenGroup = async (req, res, next) => {
  try {
    let { group_id } = req.body;
    let ans = await Groups.getMembersNotInGivenGroup(group_id);
    try {
      let members = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          name: ans[i].name,
          email: ans[i].email,
          gender: ans[i].gender,
          university: ans[i].university,
          college: ans[i].college,
        };
        members.push(n);
      }
      res.send({ members });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addMembersToGroup = async (req, res, next) => {
      try {
        let { ids, group_id } = req.body;
        let error_flag = false;
        for (let i = 0; i < ids.length; i++) {
          let member_id = ids[i];

          let a = await Groups.addMemberToGroup(
            member_id,
            group_id
          );
          if(a == "error"){
            error_flag = true
          }
        }
        if(error_flag){
          res.send({error : "Error while adding members to group"})
        }
        else{
          res.send({ message: "Members Added Successfully" });
        }
        
      } catch (error) {
        res.send({error : "Error while adding members to group"})
      }
    
  
};
