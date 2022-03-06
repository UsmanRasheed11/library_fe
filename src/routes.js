import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import DashboardLayout from "./layouts/Dashboard";

// Page components
import Blank from "./pages/pages/Blank";
import StudentList from "./pages/pages/Students/Students";
import BookList from "./pages/pages/Books/Books";

// Dashboard components
const MyRoutes = () => {
let routes = useRoutes([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        render: ()=><Navigate to={"/students"} />
      },
      {
        path: "",
        element: <Blank />,
      },
      {
        path: "students",
        element: <StudentList />,
      },
      {
        path: "books",
        element: <BookList />,
      },
    ],
  },
]);
return routes;
}
export default MyRoutes;
