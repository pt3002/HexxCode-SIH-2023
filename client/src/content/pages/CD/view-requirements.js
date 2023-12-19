import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { backendURL } from "../../../configKeys";

export default function ViewRequirements() {
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    axios
      .get(backendURL + "/CurriculumDeveloper/getAllEducatorRequirements")
      .then((res) => {
        setRows(res.data.requirements);
      });
  }, []);

  // , {
  //   headers: {
  //     "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
  //   },
  // }
  return (
    <>
    <Box sx={{ m: 5, maxHeight: "500px", overflowY: "auto" }}>
      <Typography component="h1" variant="h2" align="center">
        List of Requirements by Educators
      </Typography>
      </Box>
      <Box sx={{ m: 5, maxHeight: "500px", overflowY: "auto" }}>
        <Box sx={{ width: "100%" }}>
          {rows.map((req_item, index) => (
            <Accordion
              key={req_item.id}
              sx={{
                mb: 2,
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
              >
                <Typography>
                  Requirement No: {index + 1} - Educator: {req_item.educator_id}
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
