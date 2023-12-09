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

exports.GetResourceBySubject = async (req, res, next) => {
  const subject_id = req.params && req.params.subject_id;
  if (!subject_id) {
    return res.status(400).send({ err: " missing file name" });
  }
  try {
    let ans = await curriculumDeveloperFeatures.getResourceBySubject(
      subject_id
    );
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
