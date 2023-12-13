const { jwtSecretKey } = require("../config/configKeys");
const jwt = require("jsonwebtoken");
const { DeptHeadLogin} = require("../classes/DeptHeads");


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
