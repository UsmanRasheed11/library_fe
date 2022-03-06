import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/studentsActions";
import RowEdit from "./RowEdit";
import moment from "moment";

import {
  Divider as MuiDivider,
  Grid,
  CircularProgress,
  Button,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { spacing } from "@mui/system";
import AddStudentModal from "./AddStudent";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  { id: "firstname", alignment: "center", label: "First Name" },
  { id: "lastname", alignment: "center", label: "Last Name" },
  { id: "actions", alignment: "center", label: "" },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            style={{
              fontSize: "small",
              paddingBottom: "15px",
              paddingRight: "0px",
              paddingLeft: "8px",
            }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Students
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
    </Toolbar>
  );
};

function EnhancedTable({ rows, handleSubmit, actionsLoading }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customer");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ px: 3 }}>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >
                      <RowEdit
                        row={row}
                        labelId={labelId}
                        handleSubmit={handleSubmit}
                        actionsLoading={actionsLoading}
                      />
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function StudentList() {
  const { t } = useTranslation();
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
  };
  const { currentState } = useSelector(
    (state) => ({ currentState: state.students }),
    shallowEqual
  );
  const { entities, listLoading, actionsLoading } = currentState;
  const dispatch = useDispatch();
  const handleSubmit = async (values, handleClose) => {
    setInterval(() => {
      if (actionsLoading === false) {
        handleClose();
      }
    }, dispatch(actions.updateStudent(values)));
    dispatch(actions.fetchStudents({}));
  };
  useEffect(() => {
      dispatch(actions.fetchStudents({}));
  }, [dispatch]);
  return (
    <React.Fragment>
      <Helmet title="Students" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            {t("Welcome back")}, Admin{" "}
          </Typography>
          <Typography variant="subtitle1" display="inline" sx={{ ml: 4 }}>
            {moment().format("dddd, DD MMMM, YYYY")}
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddOpen()}
            >
              <AddIcon />
              New Student
            </Button>
            <AddStudentModal open={addOpen} handleClose={handleAddClose} />
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {listLoading ? (
            <Grid container direction="row" justifyContent="center">
              <CircularProgress sx={{ color: "white" }} />
            </Grid>
          ) : (
            <EnhancedTable
              rows={entities === null ? [] : entities}
              handleSubmit={handleSubmit}
              actionsLoading={actionsLoading}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default StudentList;
