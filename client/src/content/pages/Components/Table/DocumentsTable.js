import { useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Stack
} from "@mui/material";

import Label from "../../../../components/Label";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import { fDateTime } from "../../../../utils/formatTime"
import EditIcon from '@mui/icons-material/Edit';
import Edit from "@mui/icons-material/Edit";
import DownloadIcon from '@mui/icons-material/Download';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DocumentHistorySideBar from "../DocumentHistorySideBar";

const applyPagination = (docs, page, limit) => {
  return docs.slice(page * limit, page * limit + limit);
};

const DocumentsTable = ({ docs, access}) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginateddocs = applyPagination(docs, page, limit);

  const theme = useTheme();

  const [openFilter, setOpenFilter] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState({})

  const navigate = useNavigate();

  const handleEdit = (index) => {
    // console.log(docs, index, docs[index])
    navigate("/curriculumDeveloper/document", {
      "state" : {
        "doc" : docs[index],
        "access" : access
      }
    })
  }

  const handleOpenFilter = (index) => {
    setSelectedDoc(docs[index])
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setSelectedDoc({})
    setOpenFilter(false);
  };

  return (
    <Card>
      <CardHeader action={<Box width={150}></Box>} title="All Documents" />
      <Divider />
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <DocumentHistorySideBar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              doc = {selectedDoc}
            />
          </Stack>
        </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document Title</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateddocs.map((doc, index) => {
              return (
                <TableRow hover key={doc._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {doc.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {doc.creationCD}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {format(book.orderDate, "MMMM dd yyyy")} */}
                      {fDateTime(doc.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {doc.lastModifiedCD}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {format(book.orderDate, "MMMM dd yyyy")} */}
                      {fDateTime(doc.updatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {doc.description}
                    </Typography>
                    
                  </TableCell>
                  <TableCell align="center">
                    {
                      access == false ? (
                        <Tooltip title="View Document" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.alpha.black[10],
                          },
                          marginRight: 1,
                          color: theme.colors.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEdit(index)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                      ) : (
                        <Tooltip title="Edit Document" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.alpha.black[10],
                          },
                          marginRight: 1,
                          color: theme.colors.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                      )
                    }
                    
                    <Tooltip title="Download Document" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.alpha.black[10],
                          },
                          marginRight: 1,
                          color: theme.colors.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Show History" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.alpha.black[10],
                          },
                          marginRight: 1,
                          color: theme.colors.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleOpenFilter(index)}
                      >
                        <RestoreIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  {/* <TableCell align="right">
                    <Tooltip title="Rate Book" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.warning.lighter,
                          },
                          marginRight: 1,
                          color: theme.colors.warning.dark,
                        }}
                        color="inherit"
                        size="small">
                        <StarBorderTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as Favorite" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small">
                        <FavoriteBorderRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={docs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default DocumentsTable
