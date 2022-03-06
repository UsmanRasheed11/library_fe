import React,{ useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/studentsActions";

const initialValues = {
  firstname: "",
  lastname: "",
};

export default function AddStudentModal(props) {
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.students }),
    shallowEqual
  );
  const [int, setInt] = useState(null);
  const { actionsLoading } = currentState;
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
        <Typography id="modal-modal-title" sx={{ mt: 2 }}>
          Add Student
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            setInt(setInterval(() => {
              if (actionsLoading === false) {
                props.handleClose();
              }
            }, await dispatch(actions.createStudent(values))));
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={12}
                justifyContent="center"
                sx={{ mb: 2 }}
              >
                <Grid item>
                  <TextField
                    label="First Name"
                    onChange={(newValue) => {
                      setFieldValue("firstname", newValue.target.value);
                    }}
                    value={values.firstname}
                    sx={{ mb: 2, mx: 1 }}
                  />
                  <TextField
                    label="Last Name"
                    value={values.lastname}
                    onChange={(newValue) => {
                      setFieldValue("lastname", newValue.target.value);
                    }}
                    sx={{ pb: 4, mb: 4, mx: 1 }}
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
                    "SAVE STUDENT"
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
