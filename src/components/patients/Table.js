/* eslint-disable react/forbid-prop-types */
import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format as formatDate, parseISO } from "date-fns";
import {
  get, toUpper, startCase, isObject, isArray,
} from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel,
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
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const TableComponent = memo(({
  patients, fetchFunc, onRowClick, baseOrder,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(baseOrder);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchFunc({
      page: newPage,
      pageSize: rowsPerPage,
      order: sort,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dispatch(fetchFunc({
      page: 0,
      pageSize: +event.target.value,
      order: sort,
    }));
  };

  useEffect(() => {
    setPage(get(patients, "meta.page", 1) - 1);
    setRowsPerPage(get(patients, "meta.pageSize", 10));
    const orderFromMeta = get(patients, "meta.order", sort);
    if (isObject(orderFromMeta) && !isArray(orderFromMeta)) {
      setSort(orderFromMeta);
    } else {
      setSort(Object.fromEntries(orderFromMeta));
    }
  }, [patients]);

  const columns = [
    {
      id: "document_type", label: "Document Type", minWidth: 100, formatFunction: (value) => toUpper(value),
    },
    {
      id: "document", label: "Document #", minWidth: 100, order: true,
    },
    {
      id: "first_name", label: "Name", minWidth: 100, formatFunction: (value) => startCase(value),
    },
    {
      id: "last_name", label: "Last Name", minWidth: 100, formatFunction: (value) => startCase(value),
    },
    {
      id: "agreement", label: "Agreement Name", minWidth: 170, multiple: ["name"], formatFunction: (value) => startCase(value),
    },
    {
      id: "created_at", label: "Registration Date", minWidth: 170, formatFunction: (value) => formatDate(parseISO(value), "dd/MM/yyyy"),
    },
  ];

  const getMultipleData = (values, data) => {
    const value = values.reduce((acc, currentValue) => `${acc} ${get(data, currentValue)}`, "");
    return value;
  };

  const findSortOrder = (id) => {
    const sortItem = sort[id];
    return sortItem;
  };

  const sortColumnHandler = (id) => {
    const sortItemOrder = findSortOrder(id);
    const isAsc = sortItemOrder === "asc";
    const sortObj = {};
    sortObj[id] = isAsc ? "desc" : "asc";
    const sortUpdated = {
      ...sort,
      ...sortObj,
    };
    setSort(sortUpdated);
    dispatch(fetchFunc({
      page: 0,
      pageSize: rowsPerPage,
      order: sortUpdated,
    }));
  };

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
                  sortDirection={get(column, "order", false)}
                >
                  <TableSortLabel
                    active={column?.order}
                    direction={column?.order ? findSortOrder(column.id) : "asc"}
                    onClick={() => sortColumnHandler(column.id)}
                  >
                    {column.label}
                    {column?.order ? (
                      <span className={classes.visuallyHidden}>
                        {findSortOrder(column.id) === "desc" ? "sorted descending" : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.data.map((patient) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={patient.id} onClick={() => onRowClick(patient.id, patient)}>
                {columns.map((column) => {
                  const formatFunction = get(column, "formatFunction", false);
                  const multiple = get(column, "multiple", false);
                  const data = get(patient, column.id);
                  const value = multiple ? getMultipleData(multiple, data) : get(patient, `${column.id}`);
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
});

export default TableComponent;

TableComponent.propTypes = {
  patients: PropTypes.object.isRequired,
  fetchFunc: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  baseOrder: PropTypes.object.isRequired,
};
