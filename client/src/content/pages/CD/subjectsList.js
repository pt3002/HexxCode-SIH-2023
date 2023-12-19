import UserTokenContext from "../../../contexts/UserTokenContext";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { backendURL } from "../../../configKeys";
import axios from "axios";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/material/styles";
import { Grid, Button, Typography, Container, Card } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from '@mui/icons-material/Search';
import DocumentsTable from "../Components/Table/DocumentsTable";

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
        border: 1px solid ${
          theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"
        };
        border-radius: 2px;
        box-sizing: content-box;
        padding: 0 4px 0 10px;
        outline: 0;
        overflow: hidden;
      
        &:focus {
          border-color: ${
            theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"
          };
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

function GetSubjectsList() {
  const userContext = useContext(UserTokenContext);
  const { dict, checkToken } = userContext;
  const [tags, setTags] = useState([]);
  const [subjectName, setSubjectName] = useState("")
  const [documents, setDocuments] = useState([])
  console.log(subjectName)
  useEffect(() => {
    checkToken();
    console.log(dict)
    axios.get(backendURL + "/curriculumDeveloper/getSubjectName", {
        "headers" : {"shiksha-niyojak" : localStorage.getItem("shiksha-niyojak")}
    }).then((res) => {
        setSubjectName(res.data.subject_name)
    })

    axios.get(backendURL + "/curriculumDeveloper/allSubjects").then((res) => {
        setTags(res.data.subjects)
    })
    // getting all subjects here
}, []);

// get documents of that particular subject
const getDocumentsForEditAccess = () => {
    let body = {
        subject_name : value[0]["subject_name"]
    }
    axios.post(backendURL + "/curriculumDeveloper/getAllDocumentsForEditAccess", body, {
        "headers" : {
            "shiksha-niyojak" : localStorage.getItem("shiksha-niyojak")
        }
    }).then((res) => {
        setDocuments(res.data.complete)
    })
}

  const getMySubject = () => {
    console.log(dict.details)
  }

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
    getOptionLabel: (option) => option.subject_name,
  });

  return (
    <>
    {/* <Grid sx = {{mt : 2, mb:2}} container justifyContent="center" alignItems="center">
        <Button
        sx={{ mt: { xs: 2, md: 0 } }}
        variant="contained"
        startIcon={<SearchIcon fontSize="small" />}
        onClick = {getMySubject}
      >
        Show My Curriculums
      </Button>
        </Grid> */}
      <Grid container justifyContent="center" alignItems="center">
        <Grid sx={{ mt: 2 }}>
          {tags && (
            <>
              <div {...getRootProps()}>
                <Label {...getInputLabelProps()}>
                  Search for Subject Curriculums here
                </Label>
                <InputWrapper
                  ref={setAnchorEl}
                  className={focused ? "focused" : ""}
                >
                  {value.map((option, index) => (
                    <StyledTag
                      label={option.subject_name}
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
                      <span>{option.subject_name}</span>
                      <CheckIcon fontSize="small" />
                    </li>
                  ))}
                </Listbox>
              ) : null}
            </>
          )}
        </Grid>
      </Grid>

      {/* <Grid container justifyContent="center" alignItems="center">
      <Typography variant="h3"  gutterBottom sx = {{mt : 2}}>
              Subject Name : {subjectName}
            </Typography>
      </Grid> */}

      <Grid sx = {{mt : 2, mb:2}} container justifyContent="center" alignItems="center">
      <Button
        sx={{ mt: { xs: 2, md: 0 } }}
        variant="contained"
        startIcon={<SearchIcon fontSize="small" />}
        onClick = {getDocumentsForEditAccess}
      >
        Search Curriculum
      </Button>
      </Grid>

{
    documents.length > 0 ? (
        <Container maxWidth = "lg">
        <Card>
            <DocumentsTable docs = {documents} access = {false}/>
        </Card>
      </Container>
    ) : (
        <></>
    )
}
      

      
    </>
  );
}
export default GetSubjectsList;
