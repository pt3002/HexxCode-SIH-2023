import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Box,
  TextareaAutosize,
  InputLabel,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios"
import {backendURL} from "../../../configKeys"
import Swal from "sweetalert2";

function CreateDocument() {
  const [open, setOpen] = useState(false);

  const [documents, setDocuments] = useState([])

  const [stateVar, setStateVar] = useState({
    data: {
      title : "",
      description : ""
    },
    errors: {},
  });

  useEffect(() => {
    axios.get(backendURL + "/curriculumDeveloper/getDocuments").then((res) => {
        if(res.status == 200){
            setDocuments(res.data.documents)
        }
    })
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setStateVar({
        data: {
          title : "",
          description : ""
        },
        errors: {},
      });
    setOpen(false);
  };

  const handleOnChangeData = ({ target }) => {
    let errors = { ...stateVar.errors };
    let data = { ...stateVar.data };
    data[target.name] = target.value;
    setStateVar({ data: data, errors: errors });
  };

  const handleCreate = () => {
    if(stateVar.data.title && stateVar.data.description){
        let body = {
            "title" : stateVar.data.title,
            "description" : stateVar.data.description
        }
        axios.post(backendURL + "/curriculumDeveloper/createDocument", body).then((res) => {
            if(res["status"] == 200){
                handleClose()
                Swal.fire({
                    icon : "success",
                    title : "SUCCESS",
                    text : "Document Created Successfully"
                })
            }
        })
    }
  }

  return (
    <>
      <Helmet>
        <title>Documents Page</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Documents Page
            </Typography>
            <Typography variant="subtitle2">
              This is Projects and Drafts panel
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              onClick={handleClickOpen}
            >
              Create Document
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create New Document</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <TextField
              required
              id="outlined-required"
              label="Document Title"
              placeholder="Document Title ..."
              fullWidth
              name = "title"
              onChange={handleOnChangeData}
            />
            <Grid item xs={12} sx = {{mt : 2}}>
              <TextareaAutosize
                required
                id="description"
                name="description"
                label="Document Description*"
                placeholder="Document Description ..."
                minRows={4}
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
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateDocument;
