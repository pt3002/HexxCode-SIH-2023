import PropTypes from "prop-types";
import { Box, Card, Link, Typography, Stack, Button, Tooltip, Avatar , useTheme} from "@mui/material";
import Label from "../../../components/Label";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledSubjectImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

SubjectCard.propTypes = {
  subject: PropTypes.object,
};

export default function SubjectCard({ subject }) {
  const { cover, name, code, cds } = subject;

  const theme = useTheme();

  const navigate = useNavigate();

  const renderCurriculumDevelopers = cds.map(({name}) => (
    <Tooltip key = {name} title = {name} placeholder="bottom">
        <Avatar 
            src = "/static/images/avatars/2.jpg"
            alt = {name}
            size = "xs"
            sx={{
            border :`10 solid ${theme.colors.alpha.trueWhite[100]}`,
            cursor: "pointer",
            position: "relative",
            ml: -1.25,
  
            "&:hover, &:focus": {
              zIndex: "10",
            },}}
        />
    </Tooltip>
  ))

  return (
    <Card sx={{ height: "100%", m: 1 }}>
      <Box sx={{ position: "relative" }}>
        <Label
          variant="filled"
          color={"error"}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          Pinned
        </Label>
        <StyledSubjectImg alt={name} src={cover} />
      </Box>

      <Stack spacing={1} sx={{ px: 1, pt: 0.5 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1 }}
      >
        <Typography variant="subtitle1">
          <Typography component="span" variant="body1">
            Subject Code : {code}
          </Typography>
          {/* &nbsp;
            {fCurrency(price)} */}
        </Typography>
      </Stack>

      <Box display = "flex" justifyContent="space-between" alignItems="center">
      <Button variant="outlined" sx={{ margin: 1 }}
        onClick={() => navigate("/curriculumDeveloper/books")}
      >
                  View Books
                </Button>
        <Box display = "flex">{renderCurriculumDevelopers}</Box>
      </Box>
    </Card>
  );
}
