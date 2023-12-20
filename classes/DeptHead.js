const db = require("../config/connectSqlDb");
class DeptHeadLogin {
  static async findDeptHeadByEmail(email) {
    let sql = ` SELECT id, email, password ,name from department_head where email = "${email}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }
}
class Guidelines{

  static async getAllGuidelines() {
    let sql = `Select * from guideline`;
    const [guidelines, _] = await db.execute(sql);
    return guidelines;
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
    let sql = `SELECT * FROM subject_group WHERE department = "${department}" ORDER BY creation_date DESC`;
    const [subjects, _] = await db.execute(sql);
    return subjects;
  }

  static async getGroup(group_id) {
    let sql = `SELECT * FROM curriculum_developer WHERE group_id = "${group_id}"`;
    const [group, _] = await db.execute(sql);
    return group;
  }

  static async getMembersNotInAnyGroup() {
    let sql = `SELECT * FROM curriculum_developer WHERE group_id IS NULL`;
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

  static async deleteMemberFromGroup(member_id) {
    let sql = `UPDATE curriculum_developer SET group_id=NULL WHERE id="${member_id}"`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }

  static async viewGroupMembers(group_id) {
    let sql = `select * from curriculum_developer where group_id="${group_id}"`;
    const [members, _] = await db.execute(sql);
    return members;
  }
  
}

class DeptHeadNotification {
  static async getNotificationsByDeptHeadId(user_id) {
    let sql = `SELECT * FROM notifications WHERE user_id = "${user_id}" ORDER BY creation_time Desc;`;
    try {
      const [notifications, _] = await db.execute(sql);
      console.log(user_id);
      return notifications;
    } catch (error) {
      console.log(error);
    }
  }
  static async setNotificationSeen(user_id) {
    console.log(user_id)
    let sql = `UPDATE notifications SET isUnread = 0 WHERE user_id = "${user_id}";`;
    await db.execute(sql);
  }
  static async deleteNotification(user_id, guideline_id) {
    let sql = `DELETE FROM notifications WHERE user_id = "${user_id}" AND guideline_id = "${guideline_id}";`;
    await db.execute(sql);
  }
}
class CurriculumStatus{
    static async getAllGuidelines(department) {
      let sql = `Select * from curriculum_draft where department = "${department}"`;
      const [guidelines, _] = await db.execute(sql);
      return guidelines;
    }
  
    static async addGuideline(
      id,
      title,
      description,
      mongo_file_id,
      department,
    ) {
      let sql = `INSERT INTO curriculum_draft (id, department,mongo_file_id, status, message, title) VALUES ("${id}","${department}","${mongo_file_id}", "P", "", "${title}");`;
      try {
        await db.execute(sql);
      } catch (error) {
        console.log(error)
        return "error";
      }
    }
    
    static async deleteGuideline(id) {
      let sql = `DELETE FROM curriculum_draft where id = "${id}";`;
      try {
        await db.execute(sql);
      } catch (error) {
        console.log(error)
        return "error";
      }
    }
  }
module.exports = { CurriculumStatus, Groups, DeptHeadLogin, DeptHeadNotification, Guidelines };

