const db = require("../config/connectSqlDb");

class curriculumDeveloperAuth {
  static async getAllCurriculumDevelopers() {
    let sql = `Select * from curriculum_developer`;
    const [curriculumDevelopers, _] = await db.execute(sql);
    return curriculumDevelopers;
  }
}
class CDLogin {
  static async findCDByEmail(email) {
    let sql = ` SELECT id, name, university, college from curriculum_developer where email = "${email}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }

  static async findCDById(id) {
    let sql = `SELECT email, name, university, college from curriculum_developer where id = "${id}";`;
    const [newPost, _] = await db.execute(sql);
    return newPost;
  }
}
class curriculumDeveloperFeatures {
  static async getAllUsers() {
    let sql = `SELECT * FROM curriculum_developer;`;

    const [newPost, _] = await db.execute(sql);
    return newPost;
  }
  static async insertCD(
    id,
    email,
    name,
    gender,
    university,
    college,
    mongo_file_id
  ) {
    let sql = `INSERT INTO curriculum_developer(id, email, name, gender, university, college, resume_file_id) VALUES ("${id}","${email}","${name}","${gender}","${university}","${college}","${mongo_file_id}");`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error)
      return error.code
    }
  }
  static async getAllSubjects() {
    let sql = `SELECT * FROM subject`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async getResourceBySubject(name) {
    let sql = `SELECT * FROM  resource WHERE subject_id IN (SELECT subject_id FROM subject WHERE name="${name}");`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async getPinnedResourcesById(id) {
    let sql = `SELECT pinned_resources FROM curriculum_developer WHERE id="${id}";`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async addPinnedResources(pinned_resources, id) {
    let sql = `UPDATE curriculum_developer SET pinned_resources = '${pinned_resources}' WHERE id = '${id}';`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error);
    }
  }

  static async getPinnedSubjectsById(id) {
    let sql = `SELECT pinned_subjects FROM curriculum_developer WHERE id="${id}";`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async addPinnedSubjects(pinned_subjects, id) {
    let sql = `UPDATE curriculum_developer SET pinned_subjects = '${pinned_subjects}' WHERE id = '${id}';`;
    try {
      await db.execute(sql);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllSubjectsByDepartment(department) {
    let sql = `SELECT * FROM subject WHERE department="${department}";`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async getDraftBySubject(subject_name) {
    let sql = `SELECT * FROM subject_draft sd LEFT JOIN subject s ON s.subject_id = sd.subject_id WHERE s.name="${subject_name}";`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async getDraftByDepartment(department) {
    let sql = `SELECT * FROM subject_draft sd LEFT JOIN subject s ON s.subject_id = sd.subject_id WHERE s.department="${department}";`;
    const [result, _] = await db.execute(sql);
    return result;
  }
}


class CurriculumDeveloperLogin {
  static async findCDByEmail(email) {
    let sql = ` SELECT name, id, email , password FROM curriculum_developer where email = "${email}";`;
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


class Requirements{

  static async getAllRequirements() {
    let sql = `Select * from requirement`;
    const [requirement, _] = await db.execute(sql);
    return requirement;
  }
}


module.exports = { CDLogin,curriculumDeveloperAuth, curriculumDeveloperFeatures, Guidelines,CurriculumDeveloperLogin,Requirements };

