import { useEffect, useContext } from "react";
import { backendURL } from "../../../configKeys";
import UserTokenContext from "../../../contexts/UserTokenContext";
import axios from "axios"
import { Button } from "@mui/material";
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

export default function MergedPDF(props){

    const userContext = useContext(UserTokenContext)
    const {dict, checkToken} = userContext


    useEffect(() => {
        checkToken()
        // get all documents with same subject name

        
    }, [])

    const download = () => {
        if(dict){
            let body = {
                "subjectName" : props.subjectName
            }
            axios.post(backendURL + "/curriculumDeveloper/getDocsSubjectWise", body).then(async(res) => {
                let all_docs = res.data
                console.log(all_docs)
                let html = ""
                for(let i = 0 ; i < all_docs.length ; i++){
                    html += "<h1>" + all_docs[i]["title"] + "</h1><p><br></p>"
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

                console.log(html)
            })

        }
    }

    return(
        <>
        <Button variant = "contained" onClick = {download()} >View Merged Complete Curriculum</Button>
        </>
    )
}