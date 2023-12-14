import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
// import Scrollbar from "../../../components/Scrollbar";
import { backendURL } from "../../../configKeys";

export default function ViewRequirements() {
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    axios
      .get(backendURL + "/CurriculumDeveloper/getAllEducatorRequirements", {
        headers: {
          "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
        },
      })
      .then((res) => {
        setRows(res.data.requirements);
      });
  }, []);

  return (
    <>
    <Typography component="h1" variant="h2" align="center">
      </Typography>
      <Typography component="h1" variant="h2" align="center">
        List of Requirements by Educators
      </Typography>
      <Box sx={{ m: 5, maxHeight: "500px", overflowY: "auto" }}>
          <Box sx={{ width: "100%" }}>
            {rows.map((req_item, index) => (
              <Accordion key={req_item.id} sx={{ mb: 2, backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
                <AccordionSummary>
                  <Typography>
                    Requirement No: {req_item.id} - Educator: {req_item.educator_id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Subject:</strong> {req_item.subject}
                  </Typography>
                  <Typography>
                    <strong>Suggested Requirement:</strong>{" "}
                    {req_item.requirement_text}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
      </Box>
    </>
  );
}
