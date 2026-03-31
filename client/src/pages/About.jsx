import { useEffect, useState } from "react";
import { getProfile } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function About() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    useEffect(() => {

        const fetchProfile = async () => {

            const res = await getProfile();

            setUser(res.data.user);

        };


        fetchProfile();

    }, []);

    return (
<>
        <div className="flex justify-center items-center h-screen">

                <div className="bg-white p-6 rounded shadow w-96 items-center text-center ">

                    <div>
                        <h1>About Profile</h1>
                        {user && (
                            <div>
                                <p>Name: {user.username}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                            Logout
                        </button>
                    </div>
                </div>
        </div>
</>

    );

}

export default About;