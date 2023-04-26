import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../App.css';
import "./login.css"
import ImageSlider from "./imageSlider"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const slides = [
        {url: "Edition.png", title: "pic1"},
        {url: "Edition.png", title: "pic2"},
        {url: "Edition3.png", title: "pic3"}
    ]
    const containerStyles = {
        width: "100%",
        height: "100%",
        margin: "0 auto",
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if the entered email address ends with "@biplus.com.vn"
        if (!email.endsWith("@biplus.com.vn")) {
            setErrorMessage(
                'Please enter a valid email address ending with "@biplus.com.vn"'
            );
            return;
        }
        try {
            // Send a POST request to the API endpoint with email in the request body
            const response = await fetch(
                "http://192.168.3.150:8055/flows/trigger/a3a5d7b8-e41a-4530-ae33-c55fefc46cff",
                {
                    method: "POST",
                    body: JSON.stringify({email: email}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                // If the response is successful, parse the JSON response and retrieve the access token
                const data = await response.json();
                const accessToken = data.data.access_token;
                console.log(accessToken)
                // Set the access token in the state and clear the error message
                localStorage.setItem('accessToken', accessToken);
                navigate("/HomePage");
            } else {
                // If the response is not successful, handle the error
                console.error("Failed to login with email:", response);
            }
        } catch (error) {
            console.error("Failed to login with email:", error);
        }
    };

    return (
        <>
            <div style={containerStyles} className="">
                <ImageSlider slides={slides}/>
                <div className="text-2xl" id="loginText">
                    <span className="font-bold">BiNote</span> nơi bạn có thể lưu giữ những kiến thức của mình
                </div>

                <div className="login-page">
                    <div className="form rounded-2xl">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Nhập Gmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit">Login</button>
                        </form>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
