import UserTokenContext from "../../../contexts/UserTokenContext";
import { useContext, useEffect, useState} from "react";
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
  Paper,
} from "@mui/material";

import { ArrowForwardTwoTone } from "@mui/icons-material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import Text from "../../../components/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTheme } from "@mui/material";
import axios from "axios"
import { backendURL } from "../../../configKeys";
import {fToNow} from "../../../utils/formatTime"

import "./style.css";

const ButtonSuccess = styled(Button)(
  ({ theme }) => `
       background: ${theme.colors.success.main};
       color: ${theme.palette.success.contrastText};
  
       &:hover {
          background: ${theme.colors.success.dark};
       }
      `
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.colors.success.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.success.contrastText,
}));

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);

function UnansweredPage() {

  const theme = useTheme();

  const userContext = useContext(UserTokenContext);
  const { dict, checkToken } = userContext;

  const [posts, setPosts] = useState([])

  useEffect(() => {
    checkToken()
    axios.get(backendURL + "/Forum/getUnanswered").then((res) => {
        setPosts(res.data)
    })
  }, [])

  console.log(posts)

  return (
    <>
    {
        posts.length > 0  && posts.map((post, index) => {
           return(
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            sx = {{my:1.5}}
          >
            <Grid item xs={12} sm={12}>
              <Card>
                <CardHeader title={post.title} />
                <Divider />
                <Box p={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.description}
                  </Typography>
                  <Box sx={{ minHeight: { xs: 0 } }} py={2}>
                    <Stack direction="row" spacing={2}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        fontSize="16px"
                        sx={{ py: `${theme.spacing(1)}` }}
                      >
                        
                        Related Tags :{" "}
                      </Typography>
                      {
                            post.tags.map((tag) => {
                                return(
                                    <Item>{tag.name}</Item>
                                )
                                
                            })
                        }
                    </Stack>
                  </Box>
                </Box>
                <Divider />
                <CardActionsWrapper
                  sx={{
                    display: { xs: "block", md: "flex" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                    paddingLeft: 0.5,
                    paddingRight: 1.5,
                  }}
                >
                  <Box>
                    <Button
                      diabled
                      startIcon={<AccessTimeIcon />}
                      sx={{ marginRight: 2 }}
                    >
                      {fToNow(post.time)}
                    </Button>
                    <Button
                      startIcon={<ThumbUpAltTwoToneIcon />}
                      variant="contained"
                    >
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
                        <b>{post.views}</b>
                      </Text>{" "}
                      views •{" "}
                      <Text color="black">
                        <b>{post.upvotes.length}</b>
                      </Text>{" "}
                      upvotes
                    </Typography>
                  </Box>
                </CardActionsWrapper>
              </Card>
            </Grid>
          </Grid>
           )
        })
    }



    </>
  );
}

export default UnansweredPage;
