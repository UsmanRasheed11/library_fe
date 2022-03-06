import * as requestFromServer from "../cruds/studentsCrud";
import { studentsSlice, callTypes } from "../slices/studentsSlice";

const { actions } = studentsSlice;

export const fetchStudents = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllStudentsFull()
    .then((response) => {
      const entities = response.data;
      dispatch(
        actions.studentsFetched({
          totalCount: entities?.length || 0,
          entities: entities || [],
        })
      );
    })
    .catch((error) => {
      error = "Can't find students";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchStudent = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.studentFetched({ studentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStudentById(id)
    .then((response) => {
      const student = response.data;
      dispatch(actions.studentFetched({ studentForEdit: student }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find student";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStudent = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStudent(id)
    .then((response) => {
      dispatch(actions.studentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete student";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStudent = (studentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStudent(studentForCreation)
    .then((response) => {
      const { student } = response.data;
      dispatch(actions.studentCreated({ student }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create student";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStudent = (student) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStudent(student)
    .then(() => {
      dispatch(actions.studentUpdated({ student }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update student";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStudentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForStudents(ids, status)
    .then(() => {
      dispatch(actions.studentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update student status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStudents = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStudents(ids)
    .then(() => {
      dispatch(actions.studentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete students";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
