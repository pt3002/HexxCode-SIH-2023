const db = require("../config/connectSqlDb");


class DeptHeadLogin {
    static async findDeptHeadByEmail(email) {
      let sql = ` SELECT id, email, password ,name from department_head where email = "${email}";`;
      const [newPost, _] = await db.execute(sql);
      return newPost;
    }
}

module.exports = {DeptHeadLogin };
