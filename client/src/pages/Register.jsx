import { useState } from "react";
import { registerUser } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            await registerUser({ username, email, password });
           
            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            console.log(error.response.data);

        }

    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-cyan-100">

            <div className="bg-white p-8 rounded-xl shadow-xl w-96">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Create an account
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="border p-3 mb-4 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="border p-3 mb-4 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="border p-3 mb-4 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
                    >
                        Register
                    </button>

                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>

    );

}

export default Register;