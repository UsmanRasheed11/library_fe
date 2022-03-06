import React, { useState } from "react";
import { Formik } from "formik";

import {
  Box,
  Button,
  CircularProgress,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";


export default function RowEdit({
  row,
  handleSubmit,
  actionsLoading,
}) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <>
          <Formik
            initialValues={row}
            onSubmit={(values) => {
              handleSubmit(values, () => () => setEdit(!edit));
            }}
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <>
                <TableCell align="center">
                <TextField
                      value={values.firstname}
                      onChange={(newValue) => {
                        setFieldValue("firstname", newValue.target.value);
                      }}
                    />
                </TableCell>
                <TableCell align="center">
                <TextField
                      value={values.lastname}
                      onChange={(newValue) => {
                        setFieldValue("lastname", newValue.target.value);
                      }}
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
            <Typography>{row.firstname}</Typography>
          </TableCell>
          <TableCell align="center">
          <Typography>{row.lastname}</Typography>
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
