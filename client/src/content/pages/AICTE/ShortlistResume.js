import { Typography, Button, Grid, Box } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { backendURL } from "../../../configKeys";
import { Page, pdfjs } from "react-pdf";
import { PDFDocument } from 'pdfjs-dist';

export default function AddDepartment() {
  //  const [str, setStr] = useState(1);
  const [pdfContent, setPdfContent] = useState('');

  const [match, setMatch] = useState(null);
  const [fileData, setfileData] = useState();
  const [pdfText, setPdfText] = useState("");
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      const pdf = await PDFDocument.load(contents);
      const pages = pdf.getPages();
      let extractedText = '';

      for (const page of pages) {
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        extractedText += pageText;
      }

      setPdfContent(extractedText);
    };

    reader.readAsArrayBuffer(file);
  };

  function fileUpload(event) {
    if (event.target.files[0].type !== "application/pdf") {
      alert("Please upload PDF file");
      return;
    } else {
      let data = new FormData();
      data.append("file", event.target.files[0], event.target.files[0].name);
      console.log("Guidelines event", event);
      console.log("file===", data);

      setfileData(data);
    }
  }

  const extractTextFromPdf = async (pdfFile) => {
    try {
      const pdfDoc = await pdfjs.getDocument({ data: pdfFile.arrayBuffer() })
        .promise;
      let text = "";
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const pageText = await page.getTextContent();
        text += pageText.items.map((item) => item.str).join(" ");
      }
      return text;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "";
    }
  };

  useEffect(() => {
    let body1 = {
      JD_txt: "Good development skills knowledge of java",
      resume_txt: "Web development in React",
    };

    //   fetch(`http://localhost:5000/api/ml1`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     // body: JSON.stringify(body1),
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setMatch(data.match);
    //   })
    //     .catch((error) => console.log(error));
    // },

    fetch(`http://localhost:5000/api/ml1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body1),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setMatch(data.match);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>{pdfContent}</div>
    </div>
      {/* <Grid container spacing={3}>
        <Grid sm item>
          <Button fullWidth variant="outlined">
            <input
              type="file"
              accept=".pdf"
              onChange={(event) => fileUpload(event)}
            />
          </Button>
        </Grid>
        <Grid sm item></Grid>
      </Grid> */}
    </>
  );
}
