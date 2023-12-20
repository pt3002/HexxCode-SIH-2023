const {
  curriculumDeveloperAuth,
  curriculumDeveloperFeatures,
  CurriculumDeveloperNotification,
  CurriculumDeveloperLogin,
  Guidelines,
  Requirements,
  CDLogin,
} = require("../classes/curriculumDeveloper");

const document = require("../models/document");
const save = require("../models/save");
const Chat = require("../models/chat")
const Message = require("../models/message")
const { jwtSecretKey } = require("../config/configKeys");
const jwt = require("jsonwebtoken");

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
exports.profileDevelopment = async(req, res) => {
  let  { id }= req.body
  let ans = await curriculumDeveloperFeatures.profileDevelopment(id)
  res.send({ans})
}

exports.findCDName = async(req, res) => {
  try{
    let id = req.params && req.params.id
    let ans = await CDLogin.findCDById(id)
    res.send({name : ans[0]["name"]})
  }
  catch (error) {
    console.log(error);
    res.send({ error: "Error" });
  }
}

exports.GetAllSubjects = async (req, res, next) => {
  try {
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Subjects Not Found" });
  }
};
exports.CDRegistration = async (req, res, next) => {
  try {
    console.log("body....", req.body);
    const {
      id,
      email,
      name,
      gender,
      university,
      college,
      mongo_file_id,
      password,
    } = req.body;
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
      mongo_file_id,
      password
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
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    // console.log(cd);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
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
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    // console.log(cd);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
      let ans = await curriculumDeveloperFeatures.getDraftBySubject(
        subject_name
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
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Error Getting Drafts" });
  }
};

exports.getSubjectName  =async(req, res, next) => {
  let cd_id = req.userId;
  //console.log(cd_id)
  let ans = await curriculumDeveloperFeatures.getSubjectName(cd_id)
  let subject_name = ans[0]["subject_name"]
  res.send({subject_name})
}

exports.GetDraftByDepartment = async (req, res, next) => {
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).send({ err: " missing Subject" });
  }
  try {
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    // console.log(cd);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
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
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    // console.log(cd);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Subjects Not Found" });
  }
};

exports.AddPinnedResources = async (req, res, next) => {
  try {
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    // console.log(cd);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Cannot Add Resource" });
  }
};

exports.AddPinnedSubjects = async (req, res, next) => {
  try {
    let cd_id = req.userId;
    let cd = await CDLogin.findCDById(cd_id);
    // console.log(cd);
    if (cd.length === 0) {
      res.send({
        message: "This User is not Authorised",
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Cannot Add Subject" });
  }
};

exports.CurriculumDeveloperLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let ans = await CurriculumDeveloperLogin.findCDByEmail(email);
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
        console.log(user);
        const token = generateToken(user);
        res.send({
          message: "OTP sent",
          token: token,
          role: "CurriculumDeveloper",
        });
      } else {
        res.send({ error: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
exports.getOTPEmailCheck = async (req, res) => {
  const { email, password } = req.body;
  let ans = await CurriculumDeveloperLogin.findCDByEmail(email);
   if (ans.length === 0) {
      res.send({ message: "Wrong user selected or Register First" });
    } else {
      if (ans[0].password === password) {
        let user = {
          id: ans[0]["id"],
          role: "CurriculumDeveloper",
          name: ans[0]["name"],
          email: email,
        };
        console.log(user);
        const token = generateToken(user);
        res.send({
          message: "Login Successfully",
          token: token,
          role: "CurriculumDeveloper",
        });
      } else {
        res.send({ error: "Invalid Credentials" });
      }
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

exports.getAllRequirements = async (req, res, next) => {
  try {
    // console.log("requirements.....",req.details)
    // console.log("requirements.....",req)
    console.log("Requirements...",req.userId)
    let ans = await Requirements.getAllRequirements(req.userId);
    try {
      let requirements = [];
      for (let i = 0; i < ans.length; i++) {
        let n = {
          RowNum: ans[i].RowNum,
          id: ans[i].id,
          educator_id: ans[i].educator_id,
          department: ans[i].department,
          subject: ans[i].subject,
          requirement_text: ans[i].requirement_text,
        };
        requirements.push(n);
      }
      res.send({ requirements });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCDsofDepartment = async(req, res) => {
  const department = req.params && req.params.department;
  if(!department){
    return res.status(400).send({err: "Department is missing"})
  }
  let allCDsofDept = await curriculumDeveloperFeatures.cdsAccToDept(department)
  res.status(200).send({allCDsofDept})
}

// MONGO DB Requests
exports.createDocument = async (req, res) => {
  const { title, description, createdBy, subjectName } = req.body;
  if (!(title, description)) {
    return res.status(400).send({ error: "Input Fields Missing" });
  }
  let cd_id = req.userId;
  let cd = await CDLogin.findCDById(cd_id);
  // console.log(cd);
  if (cd.length === 0) {
    res.send({
      message: "This User is not Authorised",
    });
  } else {
    const newDocument = new document({
      title,
      description,
      subjectName
    });
    newDocument
      .save()
      .then((resp) => {
        let documentId = resp._id;
        const newSave = new save({
          documentId,
          createdBy,
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
  }
};

exports.addNewSave = async (req, res) => {
  let cd_id = req.userId;
  let cd = await CDLogin.findCDById(cd_id);
  // console.log(cd);
  if (cd.length === 0) {
    res.send({
      message: "This User is not Authorised",
    });
  } else {
    const {
      previous_saveIds,
      previousSaveId,
      documentId,
      body,
      commitMessage,
      commitType,
      createdBy,
    } = req.body;
    const newSave = new save({
      previousSaveId,
      documentId,
      body,
      commitMessage,
      commitType,
      createdBy,
    });
    newSave.save().then((save_resp) => {
      previous_saveIds.push(save_resp._id);
      // updating save id array
      document.updateOne(
        {
          _id: documentId,
        },
        {
          $addToSet: { saveIds: previous_saveIds },
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).send({ message: "Document Saved Successfully" });
          }
        }
      );
    });
  }
};

// get body of last save of a particular document
exports.GetLastSaveBody = async (req, res, next) => {
  const documentId = req.params && req.params.documentId;
  if (!documentId) {
    return res.status(400).send({ err: "Missing Document ID" });
  }
  let cd_id = req.userId;
  let cd = await CDLogin.findCDById(cd_id);
  // console.log(cd);
  if (cd.length === 0) {
    res.send({
      message: "This User is not Authorised",
    });
  } else {
  document.findById(documentId).then((resp) => {
    let last_save_id = resp.saveIds[resp.saveIds.length - 1];
    save.findById(last_save_id).then((save_resp) => {
      return res.status(200).send({ body: save_resp.body });
    });
  });
}};

// get commit history
exports.GetCommitsHistory = async (req, res, next) => {
  const documentId = req.params && req.params.documentId;
  if (!documentId) {
    return res.status(400).send({ err: "Missing Document ID" });
  }
  let cd_id = req.userId;
  let cd = await CDLogin.findCDById(cd_id);
  // console.log(cd);
  if (cd.length === 0) {
    res.send({
      message: "This User is not Authorised",
    });
  } else {
  document.findById(documentId).then(async (resp) => {
    let history = [];
    let saveIds = resp.saveIds;
    let c = 0;
    for (let i = 0; i < resp.saveIds.length; i++) {
      await save.findById(saveIds[i]).then(async (save_resp) => {
        let cd = await CDLogin.findCDById(save_resp["createdBy"]);
        let save_new = { cdname: cd[0]["name"], ...save_resp["_doc"] };
        history.push(save_new);
        c += 1;
      });
    }
    if (c == resp.saveIds.length) {
      res.send({ history });
    }
  });
}};

exports.getAllDocuments = async (req, res) => {
  let cd_id = req.userId;
  let cd = await CDLogin.findCDById(cd_id);
  // // get subject name
  // let ans = await curriculumDeveloperFeatures.getSubjectName(cd_id)
  // if(ans.length > 0){
  //   let subject_name = ans[0]["subject_name"]
  // console.log(cd);
  if (cd.length === 0) {
    res.send({
      message: "This User is not Authorised",
    });
  } else {
    document
      .find()
      .lean()
      .exec()
      .then(async (documents) => {
        let complete = [];
        for (let i = 0; i < documents.length; i++) {
          console.log(documents[i])
          let save_creation_id = documents[i].saveIds[0];
          let last_modified_save_creation_id =
            documents[i].saveIds[documents[i].saveIds.length - 1];
          await save.findById(save_creation_id).then(async (save_resp) => {
            let cd1, cd2, final;
            cd1 = await CDLogin.findCDById(save_resp["createdBy"]);
            await save
              .findById(last_modified_save_creation_id)
              .then(async (save_resp2) => {
                cd2 = await CDLogin.findCDById(save_resp2["createdBy"]);
                final = {
                  creationCD: cd1[0]["name"],
                  lastModifiedCD: cd2[0]["name"],
                  ...documents[i],
                };
                complete.push(final);
              });
          });
          
        }
        //console.log(complete)
        res.status(200).send({ complete });
      });
  }
  }
  

exports.getAllDocumentsForEditAccess = async (req, res) => {
  let cd_id = req.userId;
  let cd = await CDLogin.findCDById(cd_id);
  let { subject_name }= req.body
  // console.log(cd);
  if (cd.length === 0) {
    res.send({
      message: "This User is not Authorised",
    });
  } else {
    document
      .find()
      .then(async (documents) => {
        let complete = [];
        for (let i = 0; i < documents.length; i++) {
          console.log(documents[i])
          if(documents[i]['subjectName'] == subject_name){
            let save_creation_id = documents[i].saveIds[0];
          let last_modified_save_creation_id =
            documents[i].saveIds[documents[i].saveIds.length - 1];
          await save.findById(save_creation_id).then(async (save_resp) => {
            let cd1, cd2, final;
            cd1 = await CDLogin.findCDById(save_resp["createdBy"]);
            await save
              .findById(last_modified_save_creation_id)
              .then(async (save_resp2) => {
                cd2 = await CDLogin.findCDById(save_resp2["createdBy"]);
                final = {
                  creationCD: cd1[0]["name"],
                  lastModifiedCD: cd2[0]["name"],
                  ...documents[i],
                };
                complete.push(final._doc);
              });
          });
          }
          
        }
        //console.log(complete)
        res.status(200).send({ complete });
      });
  }
};


exports.addNewChat = async(req, res) => {
  const{
    userIds, isGroupChat
  } = req.body;
  const newChat = new Chat({
    userIds : userIds.sort(), isGroupChat
  })
  Chat.find({userIds : userIds.sort()}).then((resp) => {
    if(resp.length == 0) {
      newChat.save().then(() => {
        res.status(200).send({message : "Chat saved successfully"})
      })
    }
    else{
      res.status(200).send({message : "Chat already created"})
    }
  })
  
}

// get all chats of a particular user
exports.fetchChatsForUser = async(req, res) => {
  Chat.find({userIds : {$elemMatch: { $eq: req.userId}}}).then((chats) => {
    res.send({chats})
  })
}

// adding a message
exports.addNewMessage = async(req, res) => {
  const{
    chatId, text, sender, receiver, previousMessageIds
  } = req.body
  const newMessage = new Message({
    chatId, text, sender, receiver
  })
  newMessage.save().then((save_resp) => {
    previousMessageIds.push(save_resp._id)
    Chat.updateOne(
      {
        _id : chatId,
      },
      {
        $addToSet : {messageIds : previousMessageIds, lastMessageTime : save_resp.createdAt, lastMessageText : text}
      },
      function(err, result){
        if(err){
          res.send(err);
        }
        else{
          res.status(200).send({message : "Chat Added Successfully"})
        }
      }
    )
  })
}
exports.getNotificationsByUserId = async (req, res, next) => {
  try {
    let user_id = req.userId;
    let notifications = await CurriculumDeveloperNotification.getNotificationsByCDId(
      user_id
    );
    res.send({ notifications });
    //console.log(notifications);
  } catch (error) {
    console.log(error);
  }
};
exports.setNotificationSeen = async (req, res, next) => {
  try {
    let { user_id, user_token } = req.body;
    await CurriculumDeveloperNotification.setNotificationSeen(user_id);
    res.send({ message: "Notification seen status updated" });
    console.log("Hello...")
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const { user_id, guideline_id } = req.body;
    await CurriculumDeveloperNotification.deleteNotification(user_id, guideline_id);
    res.send({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};


exports.GetSubjectsBySemester = async (req, res, next) => {
  try {
    let sem = req.body.semester;

    let ans = await curriculumDeveloperFeatures.getSubBySem(sem);
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

exports.getAllSubjects = async(req, res, next) => {
  try{
    let subjects = await curriculumDeveloperFeatures.getAllSubjectNames()
    res.send({subjects})
  }
  catch (error) {
    console.log(error);
  }
}

exports.GetBooksBySubject = async (req, res, next) => {
  try {
    let subject_id = req.body.subject_id;

    let ans = await curriculumDeveloperFeatures.getBookBySub(subject_id);
      try {
        let books = [];
        for (let i = 0; i < ans.length; i++) {
          let n = {
            id: ans[i].id,
            name: ans[i].name,
            author: ans[i].author,
            rating: ans[i].rating,
            creation_time: ans[i].creation_time,
          };
          books.push(n);
        }
        res.send({ books });
      } catch (error) {
        console.log(error);
      }
  } catch (error) {
    console.log(error);
    res.send({ error: "Books Not Found" });
  }
};
