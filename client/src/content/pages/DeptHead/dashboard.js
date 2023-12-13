import { Helmet } from "react-helmet-async";
import { Typography, Button, Grid } from "@mui/material";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import Reviewcard from "../Components/Reviewcard";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { backendURL } from "../../../configKeys";

function DashboardDeptHead() {
//   const [subjects, setSubjects] = useState([]);

  const curriculumDeveloper = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
    department: "Computer Engineering",
  };

//   React.useEffect(() => {
//     axios
//       .get(
//         backendURL +
//           "/CurriculumDeveloper/getAllSubjectsByDepartment/" +
//           curriculumDeveloper.department
//       )
//       .then((res) => {
//         // setSubjects(res.data.subjects);
//         let array = res.data.subjects;
//         let temp_subjects = [];
//         for (let i = 0; i < array.length; i++) {
//           let n = {
//             id: array[i].subject_id,
//             cover: "/static/images/placeholders/covers/" + (i % 3) + ".jpg",
//             name: array[i].name,
//             code: array[i].subject_code,
//             cds: ["Mary", "Jack", "Ron"],
//           };
//           temp_subjects.push(n);
//         }
//         setSubjects(temp_subjects);
//         console.log("Happp0", subjects);
//       })
//       .catch((error) => {
//         console.log("Error Code: ", error);
//       });
//   });

  const subjects = [
    {
      id: "1",
      cover: "/static/images/placeholders/covers/0.jpg",
      name: "Cryptography",
      code: "CS-22001",
      cds: ["Mary", "Jack", "Ron"],
    },
    {
      id: "2",
      cover: "/static/images/placeholders/covers/1.jpg",
      name: "Compilers",
      code: "CS-23001",
      cds: ["Sony", "Rony", "Tony"],
    },
    {
      id: "3",
      cover: "/static/images/placeholders/covers/2.jpg",
      name: "Cyber Security",
      code: "CS-45600",
      cds: ["Ritu", "Sita"],
    },
  ];

  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Curriculum for {curriculumDeveloper.department}
            </Typography>
            <Typography variant="subtitle2">
              {curriculumDeveloper.name}, curriculum for different subjects is listed below:
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              endIcon={<ChevronRightTwoToneIcon fontSize="small" />}>
              View All Books
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid key={subject.id} item xs={12} md={4} xl={3}>
            <Reviewcard subject={subject} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default DashboardDeptHead;
