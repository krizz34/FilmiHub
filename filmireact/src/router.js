import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AboutUs from "./components/AboutUs/AboutUs";
import Register from "./components/Authenticate/Register";
import Login from "./components/Authenticate/Login";
import ReadAPI from "./components/CRUD/Read";
import AdminListPosts from "./components/CRUD/adminRead";
import CreateAPI from "./components/CRUD/Create";
import ViewAPI from "./components/CRUD/View";
import UpdateAPI from "./components/CRUD/Update";
import BookingRead from "./components/Booking/ReadBooking";
import BookingDetails from "./components/Booking/bookingDetails";
import ViewAdminAPI from "./components/CRUD/ViewAdmin";
import ListCollections from "./components/CRUD/CollectionRead";







const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <AboutUs/> },
    { path: 'register', element:<Register/>},
    { path: 'login', element:<Login/>},
    { path: 'readAPI', element:<ReadAPI/>},
    { path: 'adminRead', element:<AdminListPosts/>},
    { path: 'adminCollections', element:<ListCollections/>},
    { path: 'createAPI', element:<CreateAPI/>},
    { path: 'viewAPI/:postId', element:<ViewAPI/>},
    { path: 'viewAdminAPI/:postId', element:<ViewAdminAPI/>},
    { path: 'updateAPI/:postId/edit', element:<UpdateAPI/>},
    { path: 'BookingRead', element:<BookingRead/>},
    { path: 'bookingDetails/:postId', element:<BookingDetails/>},

]);

export default router;