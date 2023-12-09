import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
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
  CardHeader
} from '@mui/material';

import Label from '../../../../components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import BulkActions from './BulkActions';

const getStatusLabel = (bookstatus) => {
  const map = {
    good: {
      text: 'Good',
      color: 'error'
    },
    excellent: {
      text: 'Excellent',
      color: 'success'
    },
    great: {
      text: 'Great',
      color: 'warning'
    }
  };

  const { text, color } = map[bookstatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (books, filters) => {
  return books.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
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
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'excellent',
      name: 'Excellent'
    },
    {
      id: 'great',
      name: 'Great'
    }
    ,
    {
        id: 'good',
        name: 'Good'
      },
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllbooks = (event) => {
    setSelectedbooks(
      event.target.checked
        ? books.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (event, cryptoOrderId) => {
    if (!selectedbooks.includes(cryptoOrderId)) {
      setSelectedbooks((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedbooks((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
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
  const paginatedbooks = applyPagination(
    filteredbooks,
    page,
    limit
  );
  const selectedSomebooks =
    selectedbooks.length > 0 &&
    selectedbooks.length < books.length;
  const selectedAllbooks =
    selectedbooks.length === books.length;
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
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
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
            {paginatedbooks.map((cryptoOrder) => {
              const isbookselected = selectedbooks.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isbookselected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
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
                      {cryptoOrder.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Rate Book" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.warning.lighter
                          },
                          marginRight: 1,
                          color: theme.colors.warning.dark
                        }}
                        color="inherit"
                        size="small"
                      >
                        <StarBorderTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as Favorite" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
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
  books: PropTypes.array.isRequired
};

BooksTable.defaultProps = {
  books: []
};

export default BooksTable;
