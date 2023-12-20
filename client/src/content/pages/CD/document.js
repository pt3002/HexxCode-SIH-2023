import { Box, IconButton, Tooltip, Grid, Typography, Button, MenuItem } from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import styled from "@emotion/styled";
import ReactQuill from 'react-quill';
import './reactQuill.css'
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { backendURL } from "../../../configKeys";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import UserTokenContext from "../../../contexts/UserTokenContext";

export default function Document() {

    const userContext = useContext(UserTokenContext)
    const {dict, checkToken} = userContext

    const navigate = useNavigate();
    const location = useLocation();

    const documentId = location.state.doc._id

    const [open, setOpen] = useState(false);

    const [docsDesc, setDocsDesc] = useState('');
    const [intitalDocDesc, setInitialDocDesc] = useState('')

    const [stateVar, setStateVar] = useState({
      data: {
        commitMessage : "",
        commitType : ""
      },
      errors: {},
    });

    const getQuillData = (value) => {
        setDocsDesc(value)
    }
    useEffect(() => {
      if(dict){
        checkToken()
        axios.get(backendURL + "/curriculumDeveloper/lastSaveBody/" + documentId, {
          headers: {
            "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
          },
        }).then((resp) => {
          if(resp.status == 200){
            setDocsDesc(resp.data.body)
            setInitialDocDesc(resp.data.body)
          }
        })
      }
      
    }, [])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setStateVar({
          data: {
            commitMessage : "",
            commitType : ""
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

    const saveDocument = () => {
      let body = {previous_saveIds : location.state.doc.saveIds, 
                  previousSaveId : location.state.doc.saveIds[location.state.doc.saveIds.length - 1], 
                  documentId : location.state.doc._id, 
                  body: docsDesc, 
                  commitMessage: stateVar.data.commitMessage,
                  commitType : stateVar.data.commitType,
                  createdBy : dict.details.id
          }
      axios.post(backendURL + "/curriculumDeveloper/newSave", body, {
        headers: {
          "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
        },
      }).then((resp) => {
        if(resp.status == 200){
          handleClose()
          setInitialDocDesc(docsDesc)
          Swal.fire({
            icon : "success",
            title : "SUCCESS",
            text : "Document Saved Successfully"
          })
        }
      })
    }

    const goBack = () => {
      Swal.fire({
        icon : "info",
        title : "INFO",
        text : "Have you saved your changes? Are you sure you want to exit",
        showCancelButton : true
      }).then((confirm) => {
        if(confirm.isConfirmed){
          navigate("/curriculumDeveloper/createDocument")
        }
      })
    }

    const Editor = {
        "modules" : {
            toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              }
        },
        "formats" : [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
          ]
    }

    const Editor_not_editable = {
      "modules" : {
        toolbar: [
            [{size: []}],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          }
    },
    "formats" : [
      ]
    }

  return (
    <>
    <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box display="flex" mb={3}>
            <Tooltip arrow placement="top" title="Go Back">
              <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
                <ArrowBackTwoToneIcon onClick = {goBack}/>
              </IconButton>
            </Tooltip>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Document Title : {location.state.doc.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          {
            location.state.access == "yes" && (
              <>
              { intitalDocDesc == docsDesc ? (
                <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
                onClick={saveDocument}
                disabled
              >
                Save Document
              </Button>
              ) : (
                <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
                onClick={handleClickOpen}
              >
                Save Document
              </Button>
              )}
              </>
            )
          }
          
          
        </Grid>
      </Grid>
      </PageTitleWrapper>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Save Document Details</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <TextField
              required
              id="outlined-required"
              label="Commit Message"
              placeholder="Commit Message..."
              fullWidth
              name = "commitMessage"
              onChange={handleOnChangeData}
            />
            <Grid item xs={12} sx = {{mt : 2}}>
            <TextField
            select
              required
              id="outlined"
              label="Commit Type"
              fullWidth
              name = "commitType"
              onChange={handleOnChangeData}
            >
              {
                ["Topics Change", "Learning Outcomes Change", "Content Change", "Resources Change", "Assessment Change"].map((option) => (
                  <MenuItem key = {option} value = {option}>
                    {option}
                  </MenuItem> 
                ))
              }
             </TextField> 
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveDocument}>Create</Button>
        </DialogActions>
      </Dialog>

      <Box sx = {{px:1}}>
        {
          location.state.access === "no" ? (
            <ReactQuill
        theme = "snow"
        onChange={getQuillData}
        value = {docsDesc}
        modules = {Editor_not_editable.modules}
        format = {Editor_not_editable.formats}
        placeholder = {"Write something..."}
        /> 
          ) : (
            <ReactQuill
        theme = "snow"
        onChange={getQuillData}
        value = {docsDesc}
        modules = {Editor.modules}
        format = {Editor.formats}
        placeholder = {"Write something..."}
        /> 
          )
        }
        
      </Box>
    </>
  );
}
