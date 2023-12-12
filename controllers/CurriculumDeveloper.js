const {
  curriculumDeveloperAuth,
  curriculumDeveloperFeatures,
  CurriculumDeveloperLogin,
  Guidelines,
  Requirements,
  CDLogin,
} = require("../classes/curriculumDeveloper");

const document = require("../models/document");
const save = require("../models/save");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    jwtSecretKey
  );
  return {
    success: true,
    token: token,
  };
};
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
exports.CDRegistration = async (req, res, next) => {
  try {
    console.log("body....", req.body);
    const { id, email, name, gender, university, college, mongo_file_id } =
      req.body;
    let existingCD = await CDLogin.findCDByEmail(email);
    console.log(req.body);
    if (existingCD.length > 0) {
      return res.send({ message: "User with same email already registered" });
    }
    await curriculumDeveloperFeatures.insertCD(
      id,
      email,
      name,
      gender,
      university,
      college,
      mongo_file_id
    );
    console.log("hello", req.body);
    res.send({
      message: "Curriculum Developer registration successful",
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
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

exports.CurriculumDeveloperLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let ans = await CurriculumDeveloperLogin.findCDByEmail(email);
    console.log("ans...", ans);
    if (ans.length === 0) {
      res.send({ message: "Wrong user selected or Invalid Credentials" });
    } else {
      if (ans[0].password === password) {
        let user = {
          id: ans[0]["id"],
          role: "CurriculumDeveloper",
          name: ans[0]["name"],
          email: email,
        };
        const token = generateToken(user);
        res.send({
          message: "Login Successful",
          token: token,
        });
      } else {
        res.send({ error: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getAllGuidelines = async (req, res, next) => {
  try {
    let ans = await Guidelines.getAllGuidelines();
    try {
      let guidelines = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          id: ans[i].id,
          title: ans[i].title,
          description: ans[i].description,
          mongo_file_id: ans[i].mongo_file_id,
          creation_date: ans[i].creation_date,
          last_modified_date: ans[i].last_modified_date,
        };
        guidelines.push(n);
      }
      res.send({ guidelines });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};


exports.getAllRequirements=async(req,res,next)=>{
  try{

    let ans=await Requirements.getAllRequirements();
    try {
      let requirements = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          num:i+1,
          id: ans[i].id,
          department: ans[i].department,
          subject: ans[i].subject,
          requirement_text:ans[i].requirement_text,
        };
        requirements.push(n);
      }
      res.send({ requirements });
    } catch (error) {
      console.log(error);
    }
  }
  catch (error) {
    console.log(error);
  }
}




// MONGO DB Requests
exports.createDocument = async (req, res) => {
  const { title, description } = req.body;
  if (!(title, description)) {
    return res.status(400).send({ error: "Input Fields Missing" });
  }
  const newDocument = new document({
    title,
    description,
  });
  newDocument
    .save()
    .then((resp) => {
      let documentId = resp._id;
      const newSave = new save({
        documentId,
      });

      newSave.save().then((save_resp) => {
        let previous_saveIds = resp.saveIds;
        previous_saveIds.push(save_resp._id);
        // updating saveId array
        document.updateOne(
          { _id: resp._id },
          { $addToSet: { saveIds: previous_saveIds } },
          function (err, result) {
            if (err) {
              res.send(err);
            } else {
              res
                .status(200)
                .send({ message: "Document Created Successfully" });
            }
          }
        );
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.addNewSave = async(req, res) => {
  const {previous_saveIds, previousSaveId, documentId, body, commitMessage, commitType} = req.body;
  const newSave = new save({
    previousSaveId, documentId, body, commitMessage, commitType
  })
  newSave.save().then((save_resp) => {
    previous_saveIds.push(save_resp._id)
    // updating save id array
    document.updateOne(
      {
        _id : documentId
      },
      {
        $addToSet : {saveIds : previous_saveIds}
      },
      function(err,result){
        if(err){
          res.send(err)
        }else{
          res.status(200).send({message :"Document Saved Successfully"})
        }
      }
    )
  })
}

// get body of last save of a particular document
exports.GetLastSaveBody = async(req, res, next) => {
  const documentId = req.params && req.params.documentId
  if(!documentId){
    return res.status(400).send({err: "Missing Document ID"})
  }
  document.findById(documentId).then((resp) => {
    let last_save_id = resp.saveIds[resp.saveIds.length - 1]
    save.findById(last_save_id).then((save_resp) => {
      return res.status(200).send({body : save_resp.body})
    })
  })
}

// get commit history
exports.GetCommitsHistory = async(req, res, next) => {
  const documentId = req.params && req.params.documentId
  if(!(documentId)){
    return res.status(400).send({err: "Missing Document ID"})
  }
  document.findById(documentId).then(async(resp) => {
    let history = []
    let saveIds = resp.saveIds
    let c = 0
    for(let i = 0; i < resp.saveIds.length; i++){
      await save.findById(saveIds[i]).then((save_resp) => {
        history.push(save_resp)
        c += 1
      })
    }
    if(c == resp.saveIds.length){
      res.send({history})
    }
  })
}

exports.getAllDocuments = async (req, res) => {
  document
    .find()
    .lean()
    .exec()
    .then((documents) => {
      res.status(200).send({ documents });
    });
};
