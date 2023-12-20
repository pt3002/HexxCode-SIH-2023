import { Helmet } from "react-helmet-async";
import { Typography, Button, Grid } from "@mui/material";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import CurriculumCard from "../Components/CurriculumCard";
import axios from "axios";
import React from "react";
import { useContext, useEffect } from "react";
import UserTokenContext from "../../../contexts/UserTokenContext";
import { useState } from "react";
import { backendURL } from "../../../configKeys";

function EDviewcurri() {
    const [sub, setSub] = useState([]);
  const EDContext = useContext(UserTokenContext);
  const {dict, checkToken} = EDContext;
  React.useEffect(() => {
    checkToken();
  }, []);
//   const [subjects, setSubjects] = useState([]);

  const curriculumDeveloper = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
    department: "Computer Engineering",
  };

  // React.useEffect(() => {
  //   axios
  //     .get(backendURL + "/Educator/getCurriculum")
  //     .then((res) => {
  //       // setSubjects(res.data.subjects);
  //       let array = res.data.subjects;
  //       let temp_subjects = [];
  //       for (let i = 0; i < array.length; i++) {
  //         let n = {
  //           id: array[i].subject_id,
  //           cover: "/static/images/placeholders/covers/" + (i % 3) + ".jpg",
  //           name: array[i].name,
  //           code: array[i].subject_code,
  //           cds: ["Mary", "Jack", "Ron"],
  //         };
  //         temp_subjects.push(n);
  //       }
  //       setSubjects(temp_subjects);
  //       console.log("Happp0", subjects);
  //     })
  //     .catch((error) => {
  //       console.log("Error Code: ", error);
  //     });
  // });

  React.useEffect(() => {
    axios
      .get(`${backendURL}/Educator/getCurriculum`, {
        headers: {
          "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
        },
      })
      .then((res) => {
        // console.log("res : ",res.data.requirements);
        console.log("curriculum=======",res.data.curriculum);
        setSub(res.data.curriculum);
        console.log("curriculum...",sub);
      });
  }, []);

  // const sub = [
  //   {
  //     id: "1234",
  //     cover: "/static/images/placeholders/covers/tech-img.jpg",
  //     // name: "Cryptography",
  //     department: "Computer Engineering",
  //     // cds: ["Mary", "Jack", "Ron"],
  //   },
  //   {
  //     id: "4567",
  //     cover: "/static/images/placeholders/covers/tech-img.jpg",
  //     // name: "Compilers",
  //     department:"Electrical Engineering",
  //     // cds: ["Sony", "Rony", "Tony"],
  //   },
  //   {
  //     id: "76890",
  //     cover: "/static/images/placeholders/covers/tech-img.jpg",
  //     // name: "Cyber Security",
  //     department: "Mechanical Engineering",
  //     // cds: ["Ritu", "Sita"],
  //   },
  // ];

  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Curriculums Approved by AICTE
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              endIcon={<ChevronRightTwoToneIcon fontSize="small" />}
            >
              View All Books
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Grid container spacing={3}>
        {sub.map((subject) => (
          <Grid key={subject.id} item xs={12} md={4} xl={3}>
            <CurriculumCard subject={subject} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default EDviewcurri;
