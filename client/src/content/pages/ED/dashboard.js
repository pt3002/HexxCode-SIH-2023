import { Helmet } from "react-helmet-async";
import { Typography, Button, Grid } from "@mui/material";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import Reviewcard from "../Components/Reviewcard";
import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { backendURL } from "../../../configKeys";
import ImageSlider from "../../../components/Dashboard/Carousel";
import UserTokenContext from "../../../contexts/UserTokenContext";
function DashboardED() {
  const EDContext = useContext(UserTokenContext);
  const { dict, checkToken } = EDContext;
  const slides = [
    {
      url: "http://localhost:3000/static/images/placeholders/covers/0.jpg",
      title: "beach",
    },
    {
      url: "http://localhost:3000/static/images/placeholders/covers/1.jpg",
      title: "boat",
    },
    {
      url: "http://localhost:3000/static/images/placeholders/covers/2.jpg",
      title: "forest",
    },
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
  //   const [subjects, setSubjects] = useState([]);

  const curriculumDeveloper = {
    name: "Kriti",
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
  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <PageTitleWrapper>
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>
        <Grid container justifyContent="space-between" alignItems="center">
          {/* <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Curriculum for {curriculumDeveloper.department}
            </Typography>
            <Typography variant="subtitle2">
              {curriculumDeveloper.name}, curriculum for different subjects is listed below:
            </Typography>
          </Grid> */}
          {/* <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              endIcon={<ChevronRightTwoToneIcon fontSize="small" />}>
              View All Books
            </Button>
          </Grid> */}
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

export default DashboardED;
