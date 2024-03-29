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
  Container,
  Card
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect , useContext} from "react";
import axios from "axios"
import {backendURL} from "../../../configKeys"
import Swal from "sweetalert2";
import DocumentsTable from "../Components/Table/DocumentsTable";
import { useNavigate } from "react-router-dom";
import UserTokenContext from "../../../contexts/UserTokenContext";
import MergedPDF from "./mergedPDF";
import { useLocation } from "react-router-dom";

function CreateDocument() {

  const userContext = useContext(UserTokenContext)
  const {dict, checkToken} = userContext



  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [documents, setDocuments] = useState([])

  const location = useLocation();

  const [subject, setSubject] = useState("")

  const [openReplies, setOpenReplies] = useState(false);

  const [stateVar, setStateVar] = useState({
    data: {
      title : "",
      description : ""
    },
    errors: {},
  });

  useEffect(() => {

    if(dict){
      checkToken()
      axios.get(backendURL + "/curriculumDeveloper/getDocuments", {
        headers: {
          "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
        },
      }).then((res) => {
        if(res.status == 200){
          console.log(res)
          let d = res.data.complete
          let c = []
          for(let i = 0; i <d.length; i++){
            if(d[i]["subjectName"] == location.state){
              c.push(d[i])
            }
          }
            setDocuments(c)
        }
    })

    }
    
  }, []);

  useEffect(() => {
    checkToken()
    axios.get(backendURL + "/curriculumDeveloper/getSubjectName", {
      "headers" : {
        "shiksha-niyojak" : localStorage.getItem("shiksha-niyojak")
      }
    } ).then((res) => {
      setSubject(res.data.subject_name)
    })
}, [])

  console.log(location.state)

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

  const handleClickOpenReplies = (index) => {
    setOpenReplies(true);
  };

  const handleCloseReplies = () => {
    setOpenReplies(false);
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
            "description" : stateVar.data.description,
            "createdBy" : dict.details.id
        }
        axios.post(backendURL + "/curriculumDeveloper/createDocument", body, {
          headers: {
            "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
          },
        }).then((res) => {
            if(res["status"] == 200){
                handleClose()
                Swal.fire({
                    icon : "success",
                    title : "SUCCESS",
                    text : "Document Created Successfully"
                }).then((confirm) => {
                  if(confirm){
                    window.location.reload()
                  }
                })
            }
        })
    }
  }
  console.log(subject, location.state)

  return (
    <>
      <Helmet>
        <title>Template for Course Contents</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
            Template for Course Contents of - {location.state}
            </Typography>
            <Typography variant="subtitle2">
              This is content drafting Panel
            </Typography>
          </Grid>
          <Grid item>
            <MergedPDF subjectName ={location.state}/>
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
      <Grid justifyContent = "center" alignContent="center">
        <Grid item>
          {
            subject != location.state && (
              <Button variant = "contained" sx = {{m : 3}}>
          Give Feedback / Suggestions
        </Button>
            )
          }
        
        </Grid>
      </Grid>
      <Container maxWidth = "lg">
        <Card>
          {subject == location.state ? (
            <DocumentsTable docs = {documents} access = {"yes"} subject = {location.state}/>
          ) : (
            <DocumentsTable docs = {documents} access = {"no"} subject = {location.state}/>
          )}
          
        </Card>
      </Container>
    </>
  );
}

export default CreateDocument;
