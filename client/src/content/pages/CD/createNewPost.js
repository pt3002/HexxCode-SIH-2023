import UserTokenContext from "../../../contexts/UserTokenContext";
import { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { backendURL } from "../../../configKeys";
import axios from "axios";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardHeader,
  Divider,
  Stack,
  CardActions,
  Paper,
  TextareaAutosize,
} from "@mui/material";
import Swal from "sweetalert2";

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 515px;
  min-height : 100px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
    };
    border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"
      };
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li.${autocompleteClasses.focused} {
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `
);

function CreateNewPost() {
  const userContext = useContext(UserTokenContext);
  const { dict, checkToken } = userContext;
  const [tags, setTags] = useState([]);

  const [open, setOpen] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    checkToken();
    // get all tags
    axios.get(backendURL + "/Forum/getTags").then((res) => {
      setTags(res.data);
    });
  }, []);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [],
    multiple: true,
    options: tags,
    getOptionLabel: (option) => option.name,
  });

  //console.log(getListboxProps, value)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChangeDescription = ({ target }) => {
    setPostDescription(target.value);
  };

  const handleOnChangeTitle = ({ target }) => {
    setPostTitle(target.value);
  };

  const handleCreatePost = () => {
    let selectedTagIds = []
    for(let i = 0; i<value.length; i++){
        selectedTagIds.push(value[i]._id)
    }
    let body = {
        title : postTitle, 
        tags : selectedTagIds, 
        description : postDescription, 
        author : dict.name
    }
    axios.post(backendURL + "/Forum/addPost", body).then((res) => {
        if(res.status == 200){
            handleClose()
            Swal.fire({
                "icon" : "success",
                "title"  : "SUCCESS",
                "text"  : "Post Created Successfully",
                timer : 1500
            })
        }
    })
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Button
        sx={{ mt: { xs: 2, md: 0 } }}
        variant="contained"
        startIcon={<AddTwoToneIcon fontSize="small" />}
        onClick = {handleClickOpen}
      >
        Create New Post
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Creating New Post</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Post Title"
              placeholder="Title ..."
              fullWidth
              name = "title"
              onChange={handleOnChangeTitle}
              sx = {{marginBottom : "30px"}}
            />
              <TextareaAutosize
                required
                id="description"
                name="description"
                label="Add Description*"
                placeholder="Description ..."
                minRows={5}
                fullWidth
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                  marginBottom : "20px"
                }}
                onChange={handleOnChangeDescription}
              />
              {tags && (
                <>
                  <div {...getRootProps()}>
                    <Label {...getInputLabelProps()}>Click here to Add Tags</Label>
                    <InputWrapper
                      ref={setAnchorEl}
                      className={focused ? "focused" : ""}
                    >
                      {value.map((option, index) => (
                        <StyledTag
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      ))}
                      <input {...getInputProps()} />
                    </InputWrapper>
                  </div>
                  {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                      {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                          <span>{option.name}</span>
                          <CheckIcon fontSize="small" />
                        </li>
                      ))}
                    </Listbox>
                  ) : null}
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreatePost} variant="contained">
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default CreateNewPost;
