/* eslint-disable react/forbid-prop-types */
import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format as formatDate, parseISO } from "date-fns";
import { get, startCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  container: {
    minHeight: "50vh",
    maxHeight: "75vh",
  },
}));

const TableComponent = memo(({ agreements, fetchFunc, onRowClick }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchFunc({
      page: newPage,
      pageSize: rowsPerPage,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dispatch(fetchFunc({
      page: 0,
      pageSize: +event.target.value,
    }));
  };

  useEffect(() => {
    setPage(get(agreements, "meta.page", 1) - 1);
    setRowsPerPage(get(agreements, "meta.pageSize", 10));
  }, [agreements]);

  const columns = [
    { id: "iid", label: "Agreement #", minWidth: 100 },
    {
      id: "name", label: "Name", minWidth: 170, formatFunction: (value) => startCase(value),
    },
    {
      id: "code", label: "Code", minWidth: 170,
    },
    {
      id: "created_at", label: "Created", minWidth: 170, formatFunction: (value) => formatDate(parseISO(value), "dd/MM/yyyy"),
    },
    {
      id: "updated_at", label: "Updated", minWidth: 170, formatFunction: (value) => formatDate(parseISO(value), "dd/MM/yyyy"),
    },
  ];

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {agreements.data.map((agreement) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={agreement.id} onClick={() => onRowClick(agreement.id, agreement.name)}>
                {columns.map((column) => {
                  const formatFunction = get(column, "formatFunction", false);
                  const value = get(agreement, `${column.id}`);
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {formatFunction ? `${formatFunction(value)}` : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
});

export default TableComponent;

TableComponent.propTypes = {
  agreements: PropTypes.object.isRequired,
  fetchFunc: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
