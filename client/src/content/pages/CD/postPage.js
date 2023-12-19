import UserTokenContext from "../../../contexts/UserTokenContext";
import { useContext, useEffect, useState } from "react";
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
  TextareaAutosize,
} from "@mui/material";

import { ArrowForwardTwoTone } from "@mui/icons-material";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import Text from "../../../components/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTheme } from "@mui/material";
import axios from "axios";
import { backendURL } from "../../../configKeys";
import { fToNow } from "../../../utils/formatTime";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";

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

function PostPage() {
  const addresses = {
    delivery: 12,
    shipping: 8,
  };

  const theme = useTheme();

  const userContext = useContext(UserTokenContext);
  const { dict, checkToken } = userContext;
  const user = dict.details;

  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);

  const [openReplies, setOpenReplies] = useState(false);

  const [reply, setReply] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    checkToken();
    // console.log("afdgfsx", user);
  }, []);

  useEffect(() => {
    if (dict && dict["details"] && dict["details"]["name"]) {
      axios
        .get(backendURL + "/Forum/getAllPost/" + dict["details"]["name"])
        .then((res) => {
          setPosts(res.data.all_posts);
          // console.log("RESSS", res);
          console.log("POsttttts", res.data.all_posts);
        });
    }
  }, [dict]);

  //console.log(dict);

  const handleClickOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClickOpenReplies = (index) => {
    setCurrentIndex(index);
    setOpenReplies(true);
  };

  const handleLike = (index) => {
    // setCurrentIndex(index);
    // console.log("Current Index", index);
    let post = posts[index];
    let body = {
      id: post._id,
      user: dict.details.name,
    };
    console.log(body);
    axios.post(backendURL + "/Forum/addLike", body).then((res) => {
      // console.log("res", res);
      window.location.reload();
      // Swal.fire({
      //   icon : "success",
      //   title : "SUCCESS",
      //   text : "Reply added Successfully",
      //   timer : 1500
      // })
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseReplies = () => {
    setOpenReplies(false);
  };

  const handleOnChangeData = ({ target }) => {
    setReply(target.value);
  };

  const handleAddReply = () => {
    //console.log(post._id, reply, dict.name, post.replies)
    console.log(currentIndex);
    let post = posts[currentIndex];
    let body = {
      id: post._id,
      comment: reply,
      author: dict.details.name,
      previousReplies: post.replies,
    };
    console.log(body);
    axios.post(backendURL + "/Forum/addReply", body).then((res) => {
      handleClose();
      console.log("res", res);
      // window.location.reload();
      // Swal.fire({
      //   icon : "success",
      //   title : "SUCCESS",
      //   text : "Reply added Successfully",
      //   timer : 1500
      // })
    });
  };
  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => {
          console.log(post);
          return (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
              sx={{ my: 1.5 }}>
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
                          sx={{ py: `${theme.spacing(1)}` }}>
                          Related Tags :{" "}
                        </Typography>
                        {post.tags.map((tag) => {
                          return <Item>{tag.name}</Item>;
                        })}
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
                    }}>
                    <Box>
                      <Button
                        diabled
                        startIcon={<AccessTimeIcon />}
                        sx={{ marginRight: 2 }}>
                        {fToNow(post.time)}
                      </Button>
                      <Button
                        startIcon={<ThumbUpAltTwoToneIcon />}
                        variant={post.isLiked ? "contained" : "outlined"}
                        onClick={() => handleLike(index)}
                        // variant="outlined"
                        // variant="contained"
                      >
                        Like
                      </Button>
                      <Button
                        startIcon={<CommentTwoToneIcon />}
                        variant="outlined"
                        sx={{ ml: 2 }}
                        onClick={() => handleClickOpenReplies(index)}>
                        View All Replies
                      </Button>
                      <Button
                        startIcon={<CommentTwoToneIcon />}
                        variant="outlined"
                        sx={{ mx: 2 }}
                        onClick={() => handleClickOpen(index)}>
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
                        upvotes •{" "}
                        <Text color="black">
                          <b>{post.replies.length}</b>
                        </Text>{" "}
                        replies
                      </Typography>
                    </Box>
                  </CardActionsWrapper>
                </Card>
              </Grid>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                  Replying on {posts[currentIndex].title}
                </DialogTitle>
                <DialogContent>
                  <Box p={2}>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextareaAutosize
                        required
                        id="description"
                        name="description"
                        label="Add your Reply*"
                        placeholder="Reply ..."
                        minRows={5}
                        fullWidth
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                        onChange={handleOnChangeData}
                      />
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleAddReply} variant="contained">
                    Add Reply
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog open={openReplies} onClose={handleCloseReplies} fullWidth>
                <DialogTitle>
                  Replies for {posts[currentIndex].title}
                </DialogTitle>
                <DialogContent>
                  <Box p={2}>
                    <Grid item xs={12} sx={{ mt: 2 }}></Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseReplies}>Close</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          );
        })}
    </>
  );
}

export default PostPage;
