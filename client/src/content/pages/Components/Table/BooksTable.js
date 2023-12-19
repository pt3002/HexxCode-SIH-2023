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
} from "@mui/material";

import Label from "../../../../components/Label";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import BulkActions from "./BulkActions";

const getRatingLabel = (bookRating) => {
  const map = {
    1: {
      text: "Average",
      color: "error",
    },
    2: {
      text: "Good",
      color: "warning",
    },
    3: {
      text: "Great",
      color: "success",
    },
    4: {
      text: "Excellent",
      color: "success",
    },
  };

  const { text, color } = map[bookRating];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (books, filters) => {
  return books.filter((book) => {
    let matches = true;
    if (filters.rating && book.rating != filters.rating) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (books, page, limit) => {
  return books.slice(page * limit, page * limit + limit);
};

const BooksTable = ({ books }) => {
  const [selectedbooks, setSelectedbooks] = useState([]);
  const selectedBulkActions = selectedbooks.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    rating: null,
  });

  const ratingOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "1",
      name: "Good",
    },
    {
      id: "2",
      name: "Great",
    },
    {
      id: "3",
      name: "Excellent",
    },
  ];

  const handleRatingChange = (e) => {
    let value = null;
    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: value,
    }));
  };

  const handleSelectAllbooks = (event) => {
    setSelectedbooks(event.target.checked ? books.map((book) => book.id) : []);
  };

  const handleSelectOnebook = (event, bookId) => {
    if (!selectedbooks.includes(bookId)) {
      setSelectedbooks((prevSelected) => [...prevSelected, bookId]);
    } else {
      setSelectedbooks((prevSelected) =>
        prevSelected.filter((id) => id !== bookId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredbooks = applyFilters(books, filters);
  const paginatedbooks = applyPagination(filteredbooks, page, limit);
  const selectedSomebooks =
    selectedbooks.length > 0 && selectedbooks.length < books.length;
  const selectedAllbooks = selectedbooks.length === books.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Rating</InputLabel>
                <Select
                  value={filters.rating || "all"}
                  onChange={handleRatingChange}
                  label="Rating"
                  autoWidth>
                  {ratingOptions.map((ratingOption) => (
                    <MenuItem key={ratingOption.id} value={ratingOption.id}>
                      {ratingOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Books Section"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedbooks.map((book) => {
              const isbookselected = selectedbooks.includes(book.id);
              return (
                <TableRow hover key={book.id} selected={isbookselected}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {book.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {format(book.orderDate, "MMMM dd yyyy")} */}
                      {book.creation_time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {book.author}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getRatingLabel(book.rating)}
                  </TableCell>
                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredbooks.length}
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

BooksTable.propTypes = {
  books: PropTypes.array.isRequired,
};

BooksTable.defaultProps = {
  books: [],
};

export default BooksTable;
