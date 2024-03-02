import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AboutUs from "./components/AboutUs/AboutUs";
import Register from "./components/Authenticate/Register";
import Login from "./components/Authenticate/Login";
import ReadAPI from "./components/CRUD/Read";
import CreateAPI from "./components/CRUD/Create";
import ViewAPI from "./components/CRUD/View";
import UpdateAPI from "./components/CRUD/Update";






const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <AboutUs/> },
    { path: 'register', element:<Register/>},
    { path: 'login', element:<Login/>},
    { path: 'readAPI', element:<ReadAPI/>},
    { path: 'createAPI', element:<CreateAPI/>},
    { path: 'viewAPI/:postId', element:<ViewAPI/>},
    { path: 'updateAPI/:postId/edit', element:<UpdateAPI/>},

]);

export default router;