import { Helmet } from "react-helmet-async";
import { Typography, Button, Grid } from "@mui/material";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import SubjectCard from "../Components/SubjectCard";

function Courses() {
  const curriculumDeveloper = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
    department: "Computer Engineering",
  };

  const subjects = [
    {
        id: '1',
        cover : '/static/images/placeholders/covers/5.jpg',
        name : "Cryptography",
        code : "CS-22001",
        cds: ["Mary", "Jack", "Ron"]
    },
    {
        id : '2',
        cover : '/static/images/placeholders/covers/1.jpg',
        name : "Compilers",
        code : "CS-23001",
        cds : ["Sony", "Rony", "Tony", "Lakshay", "Sam"]
    },
    {
        id: '3',
        cover : '/static/images/placeholders/covers/6.jpg',
        name : "Cyber Security",
        code : "CS-45600",
        cds : ["Ritu", "Sita"]
    }
  ]
  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Subjects in {curriculumDeveloper.department}
            </Typography>
            <Typography variant="subtitle2">
              {curriculumDeveloper.name}, these are subjects listed in your
              department
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
      <Grid container spacing = {3}>
        {
            subjects.map((subject) => (
                <Grid key = {subject.id} item xs = {12} md = {4} xl = {3}>
                    <SubjectCard subject={subject} />
                </Grid>
            ))
        }
      </Grid>
    </>
  );
}

export default Courses;
