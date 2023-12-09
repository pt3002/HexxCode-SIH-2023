const db = require("../config/connectSqlDb");

class AICTEAdminFeatures {
  static async getAllDepartmentHeads() {
    let sql = `Select * from department_head`;
    const [departmentHeads, _] = await db.execute(sql);
    return departmentHeads;
  }

  static async addDepartmentHead(
    id,
    email,
    password,
    name,
    department,
    college,
    designation
  ) {
    let sql = `INSERT INTO department_head (id, email, password, name, department, college, designation) VALUES ("${id}","${email}","${password}","${name}","${department}","${college}","${designation}");`;
    try {
      await db.execute(sql);
    } catch (error) {
      return error.code;
    }
  }
}

module.exports = { AICTEAdminFeatures };
