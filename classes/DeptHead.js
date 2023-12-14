const db = require("../config/connectSqlDb");
class DeptHeadLogin {
  static async findDeptHeadByEmail(email) {
    let sql = ` SELECT id, email, password ,name from department_head where email = "${email}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }
}

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

  static async getGroup(group_id) {
    let sql = `SELECT * FROM curriculum_developer WHERE group_id = "${group_id}"`;
    const [group, _] = await db.execute(sql);
    return group;
  }

  static async getMembersNotInGivenGroup(group_id) {
    let sql = `SELECT * FROM curriculum_developer WHERE group_id != "${group_id}" OR group_id IS NULL`;
    const [members, _] = await db.execute(sql);
    return members;
  }

  static async addMemberToGroup(member_id, group_id) {
    let sql = `UPDATE curriculum_developer SET group_id="${group_id}" WHERE id="${member_id}"`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }
  
}

module.exports = { Groups, DeptHeadLogin };