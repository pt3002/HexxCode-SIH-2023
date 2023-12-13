const db = require("../config/connectSqlDb");

class Groups {
  static async addGroup(
    id,
    department,
    subject_name
  ) {
    let sql = `INSERT INTO subject_group (id, department, subject_name) VALUES ("${id}","${department}","${subject_name}");`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }

  static async getAllSubjectNamesByDepartment(department) {
    let sql = `SELECT * FROM subject_group WHERE department = "${department}"`;
    const [subjects, _] = await db.execute(sql);
    return subjects;
  }
}

module.exports = { Groups };