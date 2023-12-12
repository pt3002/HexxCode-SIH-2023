import { Box, IconButton, Tooltip, Grid, Typography, Button } from "@mui/material";
import React, {useState} from "react";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import styled from "@emotion/styled";
import ReactQuill from 'react-quill';
import './reactQuill.css'
import 'react-quill/dist/quill.snow.css';


export default function Document() {
    const [docsDesc, setDocsDesc] = useState('');
    const getQuillData = (value) => {
        setDocsDesc(value)
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

  return (
    <>
    <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box display="flex" mb={3}>
            <Tooltip arrow placement="top" title="Go Back">
              <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Document Title
              </Typography>
              <Typography variant="subtitle2">
                Document Created By: Prerna and Last Modified By: Pratik
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Save Document
          </Button>
        </Grid>
      </Grid>
      </PageTitleWrapper>

      <Box sx = {{px:1}}>
        <ReactQuill
        theme = "snow"
        onChange={getQuillData}
        value = {docsDesc}
        modules = {Editor.modules}
        format = {Editor.formats}
        placeholder = {"Write something..."}
        />
      </Box>
    </>
  );
}
