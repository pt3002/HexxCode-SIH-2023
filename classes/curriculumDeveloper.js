const db = require("../config/connectSqlDb");

class curriculumDeveloperAuth {
  static async getAllCurriculumDevelopers() {
    let sql = `Select * from curriculum_developer`;
    const [curriculumDevelopers, _] = await db.execute(sql);
    return curriculumDevelopers;
  }
}

class curriculumDeveloperFeatures {
  static async getAllSubjects() {
    let sql = `SELECT * FROM subject`;
    const [result, _] = await db.execute(sql);
    return result;
  }

  static async getResourceBySubject(subject_id) {
    let sql = `SELECT * FROM resource WHERE subject_id="${subject_id}";`;
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
}

module.exports = { curriculumDeveloperAuth, curriculumDeveloperFeatures };
