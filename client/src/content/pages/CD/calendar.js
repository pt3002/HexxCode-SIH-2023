import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import { Box } from "@mui/material";
import Demo from "../Components/Calendar";

function Calendar() {
  return (
    <>
      <Helmet>
        <title>Calendar Page</title>
      </Helmet>
      <Box sx={{ m: 4 }}>
        <Demo />
      </Box>
      {/* <PageTitleWrapper>
        <Grid container justifyContent = "space-between" alignItems = "center">
        <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Calendar Page
            </Typography>
            <Typography variant="subtitle2">
              You can schedule meetings here
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper> */}
    </>
  );
}

export default Calendar;
