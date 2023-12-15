const db = require("../config/connectSqlDb");
// const moment = require("moment-timezone");

class EducatorLogin {
  static async findEducatorByEmail(email) {
    let sql = ` SELECT id, name, university, college, designation, password from educator where email = "${email}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }

  static async findEducatorById(id) {
    let sql = `SELECT email, name, university, college, designation, password from educator where id = "${id}";`;
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

class Guidelines{

  static async getAllGuidelines() {
    let sql = `Select * from guideline`;
    const [guidelines, _] = await db.execute(sql);
    return guidelines;
  }
}

class Requirements{
  static async insertEducatorRequirement(
    id,
    department,
    subject,
    educator_id,
    requirement_text,
  ) {
    let sql = `INSERT INTO requirement (id, department, subject, educator_id,requirement_text) VALUES ("${id}","${department}","${subject}","${educator_id}","${requirement_text}");`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return error.code
    }
  }

  static async getEducatorRequirements(id) {
    console.log(id,typeof(id));
    let sql = `SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum,id,department,subject,requirement_text FROM requirement where educator_id="${id}"`;
    const [req, _] = await db.execute(sql);
    return req;
  }

  static async deleteRequirement(id) {
    let sql = `DELETE FROM requirement where id = "${id}";`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }
}

module.exports = {EducatorFeatures, EducatorLogin, Guidelines,Requirements};