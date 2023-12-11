const db = require("../config/connectSqlDb");
// const moment = require("moment-timezone");

class EducatorLogin {
  static async findEducatorByEmail(email) {
    let sql = ` SELECT id, name, university, college, designation, password from educator where email = "${email}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }

  static async findEducatorById(id) {
    let sql = `SELECT email, name, university, college, designation, password from organization_admin where admin_id = "${id}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }
}
class EducatorFeatures {
    static async getAllUsers() {
      let sql = `SELECT * FROM educator;`;
  
      const [newPost, _] = await db.execute(sql);
      return newPost;
    }
    static async insertEducator(
      id,
      email,
      name,
      university,
      college,
      designation,
      password,
    ) {
      let sql = `INSERT INTO educator (id, email, name, university, college, designation, password) VALUES ("${id}","${email}","${name}","${university}","${college}","${designation}","${password}");`;
      try {
        await db.execute(sql);
      } catch (error) {
        console.log(error)
        return error.code
      }
    }
}
module.exports = {EducatorFeatures, EducatorLogin};