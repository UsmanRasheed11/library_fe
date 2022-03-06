import axios from "../../utils/axios";

export const STUDENTS_URL = "/students";

// CREATE =>  POST: add a new customer to the server
export function createStudent(student) {
  return axios.post(STUDENTS_URL, { student });
}

// READ
export function getAllStudents() {
  return axios.get(STUDENTS_URL);
}

export function getAllStudentsFull() {
  return axios.get(`${STUDENTS_URL}`);
}

export function getStudentById(studentId) {
  return axios.get(`${STUDENTS_URL}/${studentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findStudents(queryParams) {
  return axios.post(`${STUDENTS_URL}`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateStudent(student) {
  return axios.put(`${STUDENTS_URL}`, { student });
}

// UPDATE Status
export function updateStatusForStudents(ids, status) {
  return axios.post(`${STUDENTS_URL}/updateStatusForStudents`, {
    ids,
    status,
  });
}

// DELETE => delete the customer from the server
export function deleteStudent(studentId) {
  return axios.delete(`${STUDENTS_URL}/${studentId}`);
}

// DELETE Customers by ids
export function deleteStudents(ids) {
  return axios.post(`${STUDENTS_URL}/deleteStudents`, { ids });
}
