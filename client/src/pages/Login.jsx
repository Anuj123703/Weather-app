import { loginUser } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../Config/firebase";
import axios from "axios";
import { useState, useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {API} from "../services/AuthService";
import { signInWithRedirect } from "firebase/auth";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill your credentials");
            return;
        }
        try {
            const res = await loginUser({ email, password });
            localStorage.setItem("token", res.data.data.token);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Invalid credentials");
        }
    };

    const handleGoogleLogin = () => {
        signInWithRedirect(auth, provider); // trigger redirect
    };

    useEffect(() => {
        const fetchRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (!result) return; // first load, no redirect yet

                const user = result.user;
                const res = await axios.post(`${API}/api/auth/users/google`, {
                    name: user.displayName,
                    email: user.email,
                });

                localStorage.setItem("token", res.data.token);
                navigate("/"); // redirect after login
            } catch (err) {
                console.error(err);
            }
        };

        fetchRedirectResult();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-cyan-100">

            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(" ")
                        }}
                    />

                    <input
                        className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(" ");
                        }}
                    />

                    <button
                        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
                <img
                    src="/google.svg"
                    alt="icon"
                    className="w-8 h-8 cursor-pointer mx-auto transition-transform hover:scale-110 mt-6"
                    onClick={handleGoogleLogin}
                />
            </div>

        </div>

    );

}

export default Login;