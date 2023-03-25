import React from "react";
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserForm from "./pages/UserForm";
import Users from "./pages/Users";

const router =  createBrowserRouter([
    {path: '/', element: <DefaultLayout/>, children: [
        {path: '/', element: <Navigate to="/users" /> },
        {path: '/dashboard', element: <Dashboard/>},
        {path: '/users', element: <Users/>},
        {path: '/users/new', element: <UserForm key='userCreate' />},
        {path: '/users/:id', element: <UserForm key='userUpdate' />},
        
    ]},
    {path: '/', element: <GuestLayout/>, children: [
        {path: '/login', element: <Login/>},
        {path: '/signup', element: <Signup/>}
    ]},   
    {path: '*', element: <NotFound/>},
 ]);

 export default router;