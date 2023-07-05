import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import '../App.css';
import "./login.css"
import ImageSlider from "./imageSlider"
import {showToast} from "../common/Toast";
import wsRef from '../WebSocket/wsRef';

const LoginForm = () => {
//     const [email, setEmail] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();
//     const slides = [
//         {url: "/Images/pic1.png", title: "Pic1"},
//         {url: "/Images/pic2.png", title: "pic2"},
//         {url: "/Images/pic3.png", title: "pic3"}
//     ]
//     const containerStyles = {
//         width: "100%",
//         height: "100%",
//         margin: "0 auto",
//     };
//
//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Check if the entered email address ends with "@biplus.com.vn"
//         if (!email.endsWith("@biplus.com.vn")) {
//             setErrorMessage(
//                 'Please enter a valid email address ending with "@biplus.com.vn"'
//             );
//             return;
//         }
//         try {
//             // Send a POST request to the API endpoint with email in the request body
//             const response = await fetch(
//                 "https://binote-api.biplus.com.vn/flows/trigger/a3a5d7b8-e41a-4530-ae33-c55fefc46cff",
//                 {
//                     method: "POST",
//                     body: JSON.stringify({email: email}),
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//
//             if (response.ok) {
//                 const data = await response.json();
//                 const accessToken = data.data.access_token;
//                 localStorage.setItem('accessToken', accessToken);
//                 localStorage.setItem('loggedIn', true);
//                 navigate("/HomePage");
//             } else {
//                 // If the response is not successful, handle the error
//                 console.error("Failed to login with email:", response);
//             }
//         } catch (error) {
//             console.error("Failed to login with email:", error);
//         }
//     };
//
//     return (
//         <>
//             <div style={containerStyles} className="">
//                 <ImageSlider slides={slides}/>
//                 <div className="text-2xl" id="loginText">
//                     <span className="font-bold">BiNote</span> nơi bạn có thể lưu giữ những kiến thức của mình
//                 </div>
//
//                 <div className="login-page">
//                     <div className="form rounded-2xl">
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 type="email"
//                                 placeholder="Nhập mail biplus của bạn"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <button type="submit">Login</button>
//                         </form>
//                         {errorMessage && <p>{errorMessage}</p>}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
        const navigate = useNavigate();
        const slides = [
            {url: "/Images/pic1.png", title: "Pic1"},
            {url: "/Images/pic2.png", title: "pic2"},
            {url: "/Images/pic3.png", title: "pic3"}
        ]
        const containerStyles = {
            width: "100%",
            height: "100%",
            margin: "0 auto",
        };

        function handleLogin() {
            window.location.href = 'https://binote-api.biplus.com.vn/auth/login/google?redirect=http://localhost:3000/';
            localStorage.setItem('QA', "logIn");
        }

        function refreshTokens() {
            return fetch('https://binote-api.biplus.com.vn/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            });
        }

        if (localStorage.getItem('QA') !== "logOut") {
            refreshTokens()
                .then(response => response.json())
                .then(data => {
                    const accessToken = data.data.access_token;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('QA', "active")
                    navigate("/home");
                    handleConnect()
                })
                .catch((error) => {
                    showToast("Hãy đăng nhập lại với mail Biplus của bạn", "error")
                });
        }

        const [socketURL] = useState('ws://192.168.3.150:8050/websocket');
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNDU4MDNhLTJlNTktNDYzZS04Y2FjLTU1ZTBmMDc2YmUxOCIsInJvbGUiOiIwODhkZTczMy0yNDkzLTQ5ZGMtYTVlNi00MzU0NTM0NWY0ODAiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOmZhbHNlLCJpYXQiOjE2ODg1MjI0NjMsImV4cCI6MTY5MTExNDQ2MywiaXNzIjoiZGlyZWN0dXMifQ.G2FEZsFPSdykFhYei6e8l_cjgwnsG8670MjBUDq2Tdg";

        function handleConnect() {
            const url = socketURL + (accessToken ? '?access_token=' + accessToken : '');
            const ws = new WebSocket(url);
            wsRef.current = ws;
        }

        return (
            <>
                <div style={containerStyles} className="">
                    <ImageSlider slides={slides}/>
                    <div className="text-2xl" id="loginText">
                        <span className="font-bold">BiNote</span> nơi bạn có thể lưu giữ những kiến thức của mình
                    </div>

                    <div className="login-page">
                        <div className="form rounded-2xl">
                            <button onClick={handleLogin} className="flex justify-evenly">
                                <img src="/Images/googleIcon.svg" alt="Google icon"/>
                                <div>Đăng nhập với Google</div>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
;
export default LoginForm;



