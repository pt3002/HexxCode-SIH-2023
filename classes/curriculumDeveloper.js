const db = require("../config/connectSqlDb")

class curriculumDeveloperAuth{
    static async getAllCurriculumDevelopers() {
        let sql = `Select * from curriculum_developer`;
        const [curriculumDevelopers, _] = await db.execute(sql);
        return curriculumDevelopers;
    }
}

module.exports = {curriculumDeveloperAuth}