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

  static async updateDepartmentHead(
    id,
    email,
    name,
    department,
    college,
    designation
  ) {
    let sql = `UPDATE department_head SET email="${email}", name="${name}", department="${department}", college="${college}", designation="${designation}" where id = "${id}";`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }

  static async deleteDepartmentHead(id) {
    let sql = `DELETE FROM department_head where id = "${id}";`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }
}

module.exports = { AICTEAdminFeatures };
