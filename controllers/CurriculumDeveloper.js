const { response } = require("express");
const {
  curriculumDeveloperAuth,
  curriculumDeveloperFeatures,
} = require("../classes/curriculumDeveloper");

exports.GetAllSubjects = async (req, res, next) => {
  try {
    let ans = await curriculumDeveloperFeatures.getAllSubjects();
    try {
      let subjects = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          subject_id: ans[i].subject_id,
          name: ans[i].name,
          department: ans[i].department,
          list_resource_id: ans[i].list_resource_id,
          subject_code: ans[i].subject_code,
        };
        subjects.push(n);
      }
      res.send({ subjects });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Subjects Not Found" });
  }
};

exports.GetAllSubjectsByDepartment = async (req, res, next) => {
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).send({ err: " missing Department" });
  }
  try {
    let ans = await curriculumDeveloperFeatures.getAllSubjectsByDepartment(
      department
    );
    try {
      let subjects = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          subject_id: ans[i].subject_id,
          name: ans[i].name,
          department: ans[i].department,
          list_resource_id: ans[i].list_resource_id,
          subject_code: ans[i].subject_code,
        };
        subjects.push(n);
      }
      res.send({ subjects });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Error Getting Subjects" });
  }
};

exports.GetDraftBySubjects = async (req, res, next) => {
  const subject_name = req.params && req.params.subject_name;
  if (!subject_name) {
    return res.status(400).send({ err: " missing Subject" });
  }
  try {
    let ans = await curriculumDeveloperFeatures.getDraftBySubject(subject_name);
    try {
      let drafts = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          subject_id: ans[i].subject_id,
          draft_content_filename: ans[i].draft_content_filename,
          draft_head_id: ans[i].draft_head_id,
          creation_date: ans[i].creation_date,
          subject_name: ans[i].name,
          department: ans[i].department,
          list_resource_id: ans[i].list_resource_id,
          subject_code: ans[i].subject_code,
        };
        drafts.push(n);
      }
      res.send({ drafts });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Error Getting Drafts" });
  }
};

exports.GetDraftByDepartment = async (req, res, next) => {
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).send({ err: " missing Subject" });
  }
  try {
    let ans = await curriculumDeveloperFeatures.getDraftByDepartment(
      department
    );
    try {
      let drafts = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          subject_id: ans[i].subject_id,
          draft_content_filename: ans[i].draft_content_filename,
          draft_head_id: ans[i].draft_head_id,
          creation_date: ans[i].creation_date,
          subject_name: ans[i].name,
          department: ans[i].department,
          list_resource_id: ans[i].list_resource_id,
          subject_code: ans[i].subject_code,
        };
        drafts.push(n);
      }
      res.send({ drafts });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Error Getting Drafts" });
  }
};

exports.GetResourceBySubject = async (req, res, next) => {
  const name = req.params && req.params.name;
  if (!name) {
    return res.status(400).send({ err: " missing file name" });
  }
  try {
    let ans = await curriculumDeveloperFeatures.getResourceBySubject(name);
    try {
      let resources = [];
      if (ans.length > 0) {
        for (let i = 0; i < ans.length; i++) {
          let n = {
            id: ans[i].id,
            subject_id: ans[i].subject_id,
            code: ans[i].code,
            name: ans[i].name,
            author: ans[i].author,
            rating: ans[i].rating,
            creation_time: ans[i].creation_time,
          };
          resources.push(n);
        }
      }
      res.send({ resources });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Subjects Not Found" });
  }
};

exports.AddPinnedResources = async (req, res, next) => {
  try {
    let { id, resource } = req.body;
    let all_pinned_resources =
      await curriculumDeveloperFeatures.getPinnedResourcesById(id);
    if (all_pinned_resources[0].pinned_resources != null) {
      let array = all_pinned_resources[0].pinned_resources.split("#");

      if (array.indexOf(resource) == -1) {
        let pinned_resources =
          all_pinned_resources[0].pinned_resources + "#" + resource;
        await curriculumDeveloperFeatures.addPinnedResources(
          pinned_resources,
          id
        );
      }
    } else {
      await curriculumDeveloperFeatures.addPinnedResources(resource, id);
    }
    res.send({ message: "Resource Added Sucessufully" });
  } catch (error) {
    console.log(error);
    res.send({ error: "Cannot Add Resource" });
  }
};

exports.AddPinnedSubjects = async (req, res, next) => {
  try {
    let { id, subject } = req.body;
    let all_pinned_subject =
      await curriculumDeveloperFeatures.getPinnedSubjectsById(id);
    if (all_pinned_subject[0].pinned_subjects != null) {
      let array = all_pinned_subject[0].pinned_subjects.split("#");

      if (array.length >= 3) {
        res.send({ error: "Only 3 Subject Can be Added" });
      }

      if (array.indexOf(subject) == -1) {
        let pinned_subjects =
          all_pinned_subject[0].pinned_subjects + "#" + subject;
        await curriculumDeveloperFeatures.addPinnedSubjects(
          pinned_subjects,
          id
        );
      }
    } else {
      await curriculumDeveloperFeatures.addPinnedSubjects(subject, id);
    }
    res.send({ message: "Subject Added Sucessufully" });
  } catch (error) {
    console.log(error);
    res.send({ error: "Cannot Add Subject" });
  }
};
