import UserTokenContext from "../../../contexts/UserTokenContext";
import { useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid,
  styled,
  Stack,
  CardActions,
} from "@mui/material";

import { ArrowForwardTwoTone } from "@mui/icons-material";
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import Text from "../../../components/Text";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import "./style.css"

const ButtonSuccess = styled(Button)(
    ({ theme }) => `
       background: ${theme.colors.success.main};
       color: ${theme.palette.success.contrastText};
  
       &:hover {
          background: ${theme.colors.success.dark};
       }
      `
  );

  const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
  );

function PostPage() {
  const addresses = {
    delivery: 12,
    shipping: 8,
  };

  const userContext = useContext(UserTokenContext);
  const { dict, checkToken } = userContext;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={12}>
          <Card>
            <CardHeader
              title="Delivery Addresses"
            />
            <Divider />
            <Box p={2}>
              <Typography variant="subtitle1" fontWeight="bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <Box sx={{ minHeight: { xs: 0 } }} py = {2}>
                <Typography variant="h5" fontWeight="bold" fontSize="16px">Related Tags : </Typography>
                
              </Box>
            </Box>
            <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between',
          py : 1,
          paddingLeft:0.5,
          paddingRight : 1.5
        }}
      >
        <Box>
            <Button diabled startIcon = {<AccessTimeIcon />} sx = {{marginRight:2}}>5 Days Ago</Button>
          <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
            Like
          </Button>
          <Button
            startIcon={<CommentTwoToneIcon />}
            variant="outlined"
            sx={{ mx: 2 }}
          >
            Reply
          </Button>
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle2" component="span">
            <Text color="black">
              <b>485</b>
            </Text>{' '}
            reactions •{' '}
            <Text color="black">
              <b>63</b>
            </Text>{' '}
            comments
          </Typography>
        </Box>
      </CardActionsWrapper>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default PostPage;
