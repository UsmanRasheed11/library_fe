import React, { useState } from "react";
import { Formik } from "formik";
import moment from "moment";

import {
  Box,
  Button,
  MenuItem,
  CircularProgress,
  Select,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { shallowEqual, useSelector } from "react-redux";


export default function RowEdit({
  row,
  handleSubmit,
  actionsLoading,
}) {
  const [edit, setEdit] = useState(false);
  const { studentState } = useSelector(
    (state) => ({ studentState: state.students }),
    shallowEqual
  );
  const { entities } = studentState;

  return (
    <>
      {edit ? (
        <>
          <Formik
            initialValues={row}
            onSubmit={(values) => {
              if(values.student_id !== 0){
              values.date_borrow = moment().toISOString();
              if(!values.date_return){
                values.date_return = moment().endOf('month').toISOString();
              }
            }
            else{
              values.date_borrow = null;
              values.date_return = null;
            }
              handleSubmit(values, () => () => setEdit(!edit));
            }}
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <>
                <TableCell align="center">
                <TextField
                      value={values.name}
                      onChange={(newValue) => {
                        setFieldValue("name", newValue.target.value);
                      }}
                    />
                </TableCell>
                <TableCell align="center">
                <TextField
                      value={values.author}
                      onChange={(newValue) => {
                        setFieldValue("author", newValue.target.value);
                      }}
                    />
                </TableCell>
                <TableCell align="center">
                <Select
                    value={values.student_id?values.student_id:0}
                    onChange={(newValue) => {
                      setFieldValue("student_id", newValue.target.value);
                    }}
                    label="State"
                  >
                    <MenuItem value={0}>Select Student</MenuItem>
                    {entities.map((student) => {
                      return (
                        <MenuItem key={student.id} value={student.id}>{student.firstname}{" "}{student.lastname}</MenuItem>
                      )
                    })}
                  </Select>
                </TableCell>
                <TableCell align="center">
                <Typography>{values.date_borrow?moment(values.date_borrow).format("DD-MM-YYYY"):"Empty"}</Typography>
                </TableCell>
                <TableCell align="center">
                <DatePicker
                    label="Expected Date of Return"
                    value={values.date_return?moment(values.date_return).toDate():moment().toDate()}
                    onChange={(newValue) => {
                      setFieldValue(
                        "date_return",
                        newValue.toISOString()
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </TableCell>
                <TableCell padding="none" align="right">
                  <Box mr={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{ color: "white" }}
                      onClick={() => handleSubmit()}
                    >
                      {actionsLoading ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        "DONE"
                      )}
                    </Button>
                  </Box>
                </TableCell>
              </>
            )}
          </Formik>
        </>
      ) : (
        <>
          <TableCell align="center">
            <Typography>{row.name}</Typography>
          </TableCell>
          <TableCell align="center">
          <Typography>{row.author}</Typography>
          </TableCell>
          <TableCell align="center">
          <Typography>{row.firstname || row.lastname? row.firstname +" "+row.lastname:"Empty"}</Typography>
          </TableCell>
          <TableCell align="center">
          <Typography>{row.date_borrow?moment(row.date_borrow).format("DD-MM-YYYY"):"Empty"}</Typography>
          </TableCell>
          <TableCell align="center">
          <Typography>{row.date_return?moment(row.date_return).format("DD-MM-YYYY"):"Empty"}</Typography>
          </TableCell>
          <TableCell padding="none" align="right">
            <Box mr={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white" }}
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                EDIT
              </Button>
            </Box>
          </TableCell>
        </>
      )}
    </>
  );
}
