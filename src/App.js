import './App.css';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import Login from "./Login/login";
import React, {useState} from "react";
import HomePage from "./HomePage/homePage"
import CourseCard from "./HomePage/courseCard"
import NoteDetails from "./NoteDetails/noteDetails"
import {ToastContainerComponent} from './common/Toast';
import "react-toastify/dist/ReactToastify.css"
import Profile from "./Profile/profile";
import Statistical from "./DashBoard/statistical"
import VCard from "./Profile/V-card";

function App() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedIn");
        navigate("/");
    };

    return (
        <div className="App">
            <ToastContainerComponent/>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Navigate to="/HomePage" replace/>}/>
                ) : (
                    <Route path="/" element={<Login/>}/>
                )}
                <Route path="/HomePage" element={<HomePage handleSignOut={handleSignOut}/>}>
                    <Route path="" element={<CourseCard/>}/>
                </Route>
                <Route path='/NoteDetails/:id' element={<NoteDetails handleSignOut={handleSignOut}/>}/>
                <Route path='/Profile' element={<Profile/>}/>
                <Route path='/bicard/:id' element={<VCard/>}/>
                <Route path='/Statistical' element={<Statistical/>}/>
            </Routes>
        </div>
    );
}

export default App;
