import { useEffect, useContext, useState, useRef } from "react";
import { backendURL } from "../../../configKeys";
import UserTokenContext from "../../../contexts/UserTokenContext";
import axios from "axios"
import { Button, Box, Grid } from "@mui/material";
import {
    PDFDownloadLink,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    pdf
  } from "@react-pdf/renderer";

  import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactHtmlParser from 'react-html-parser'; 
import html2canvas from "html2canvas"
import jsPDF from 'jspdf'


export default function MergedPDF(props){

    const pdfRef = useRef()

    const userContext = useContext(UserTokenContext)
    const {dict, checkToken} = userContext

    const [open, setOpen] = useState(false);

    const [html, setHtml] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        checkToken()
        // get all documents with same subject name

        
    }, [])

    useEffect(() => {
        if(dict){
            let body = {
                "subjectName" : props.subjectName
            }
            axios.post(backendURL + "/curriculumDeveloper/getDocsSubjectWise", body).then(async(res) => {
                let all_docs = res.data
                console.log(all_docs)
                let html = ""
                for(let i = 0 ; i < all_docs.length ; i++){
                    html += "<h3>" + all_docs[i]["title"] + "</h3><p><br></p>"
                    await axios.get(backendURL + "/curriculumDeveloper/lastSaveBody/" + all_docs[i]["_id"], {
                        headers: {
                          "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
                        },
                      }).then((resp) => {
                        if(resp.status == 200){
                            html += resp.data.body
                        }
                      })
                }
                html = "<div>" + html + "</div>"
                setHtml(html)
            })

        }
    }, [dict])

    const downloadPDF = () => {
        const input = pdfRef.current; 
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
            const imgX  = (pdfWidth - imgWidth*ratio)/2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth *ratio, imgHeight *ratio);
            pdf.save('complete.pdf');

        })

    }

    console.log(html)

    return(
        <>
        <Button variant = "contained" onClick = {handleClickOpen} >View Merged Complete Curriculum</Button>

        <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Viewing Complete Draft</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
                <div ref = {pdfRef}>{ ReactHtmlParser (html) }</div>
            
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick = {downloadPDF}>
            Export As PDF
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}