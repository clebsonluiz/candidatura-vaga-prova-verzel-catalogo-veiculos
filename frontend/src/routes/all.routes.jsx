import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/home";
import ErrorPage from "../pages/error";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import AdminPage from "../pages/admin";
import ProfilePage from "../pages/profile";


const allRoutes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
    {
        path: '/admin/cars',
        element: <><div>Admin Page Cars</div></>,
    },
    {
        path: '/admin/cars:carId',
        element: <><div>Admin Page Car </div></>
    }
])

export default allRoutes;