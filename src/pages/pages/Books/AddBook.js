import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Modal,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import moment from "moment";
import { Formik, Form } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/booksActions";

const initialValues = {
  name: "",
  author: "",
  student_id: 0,
  date_borrow: null,
  date_return: null,
};

export default function AddBookModal(props) {
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.books }),
    shallowEqual
  );
  const { studentState } = useSelector(
    (state) => ({ studentState: state.students }),
    shallowEqual
  );
  const [int, setInt] = useState(null);
  const { actionsLoading } = currentState;
  const { entities } = studentState;
  const style = {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "85%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "100%", md: "50%" },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    return () => {
      clearInterval(int);
    };
  });
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ bgcolor: "transparent" }}
    >
      <Box item sx={style}>
        <Typography id="modal-modal-title" sx={{ mt: 2, mb:3 }}>
          Add Book
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if(values.student_id !== 0){
              values.date_borrow = moment().toISOString();
              if(!values.date_return){
                values.date_return = moment().endOf('month').toISOString();
                console.log(values.date_return)
              }
            }
            else{
              values.date_borrow = null;
              values.date_return = null;
            }
            setInt(setInterval(() => {
              if (actionsLoading === false) {
                props.handleClose();
              }
            }, await dispatch(actions.createBook(values))));
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={12}
                direction={"column"}
                sx={{ mb: 2 }}
              >
                <Grid item sx={{ mb: 1, pt:0, mx:"auto" }}>
                  <TextField
                    label="Book Name"
                    onChange={(newValue) => {
                      setFieldValue("name", newValue.target.value);
                    }}
                    value={values.firstname}
                    
                  />
                </Grid>
                <Grid sx={{ mb: 1, pl:12, pt:2, mx:"auto" }}>
                  <TextField
                    label="Author Name"
                    value={values.lastname}
                    onChange={(newValue) => {
                      setFieldValue("author", newValue.target.value);
                    }}
                  />
                </Grid>
                <Grid sx={{ mb: 1, pl:12, pt:2, mx:"auto" }}>
                  <Select
                    value={values.student_id}
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
                </Grid>
                <Grid sx={{ mb: 1, pl:12, pt:2, mx:"auto" }}>
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
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ color: "white" }}
                >
                  {actionsLoading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "SAVE BOOK"
                  )}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
