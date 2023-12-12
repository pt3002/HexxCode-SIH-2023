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

class Guidelines{

  static async getAllGuidelines() {
    let sql = `Select * from guideline`;
    const [guidelines, _] = await db.execute(sql);
    return guidelines;
  }

  static async addGuideline(
    id,
    title,
    description,
    mongo_file_id
  ) {
    let sql = `INSERT INTO guideline (id, title, description, mongo_file_id) VALUES ("${id}","${title}","${description}","${mongo_file_id}");`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }

  static async updateGuideline(
    id,
    title,
    mongo_file_id,
    last_modified_date
  ) {
    let sql = `UPDATE guideline SET title="${title}", mongo_file_id="${mongo_file_id}", last_modified_date="${last_modified_date}" where id = "${id}";`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }

  static async deleteGuideline(id) {
    let sql = `DELETE FROM guideline where id = "${id}";`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }
}

class CurriculumDevelopers{
  static async getAllCD(){

    // let sql = `select * from curriculum_developers`;
    let sql = `select id,name,email,gender,university,college,department,status,resume_file_id from curriculum_developer`;
    const [curriculumdevelopers, _] = await db.execute(sql);
    return curriculumdevelopers;
  }

  static async changeStatus(
    id,
    new_status
  ) {
    let sql = `update curriculum_developer set status="${new_status}" where id="${id}"`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }

  static async deleteCD(id) {
    let sql = `DELETE FROM curriculum_developer where id = "${id}";`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return "error";
    }
  }
}

module.exports = { AICTEAdminFeatures, Guidelines, CurriculumDevelopers };
