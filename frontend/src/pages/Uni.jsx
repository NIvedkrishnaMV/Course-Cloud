import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './UniAndCor.css';
import { Link, useNavigate } from 'react-router-dom';

const Uni = () => {
    const navigate = useNavigate();
    const [menuToggle, setMenuToggle] = useState(false);

    // State for university data
    const [universities, setUniversities] = useState([]);

    // Toggle the menu
    const showMenu = () => {
        setMenuToggle(prevState => !prevState);
    };

    // Handle logout
    const handleLogOut = async () => {
        try {
            await axios.delete("http://localhost:3001/apiu/logout");
            alert("Logged Out");
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    // Navigate to home
    const goHome = () => {
        navigate('/landing');
    };

    // Fetch universities data
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const result = await axios.get("http://localhost:3001/apit/uni-view");
                console.log("Fetched universities:", result.data.data);
                setUniversities(result.data.data || []); // Use a default empty array if no data
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };

        fetchUniversities();
    }, []);

    return (
        <div className="Lan-container">
            <img
                className='lph'
                src="https://static.vecteezy.com/system/resources/previews/004/495/548/original/light-soft-color-blue-low-poly-crystal-background-polygon-design-pattern-low-poly-illustration-low-polygon-background-free-vector.jpg"
                alt="Background"
            />
            <nav className="Lan-navbar">
                <button className='menu-btn' onClick={showMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f0ffff">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                </button>
                <ul className="Lan-nav-links">
                    <li><button className='Lan-homebtn' onClick={goHome}>Home</button></li>
                    <li>
                        <button className='profileBtn' onClick={handleLogOut}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="34px" fill="#fff">
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="Lan-body">
                {menuToggle && (
                    <ul className="menuList">
                        <li><Link to={"/uni"}><button className="sNavbutton">University</button></Link></li>
                        <li><Link to={'/cor'}><button className="sNavbutton">Courses</button></Link></li>
                        <li>
                            <Link to={'/upload'}>
                                <button className="sNavbutton">Add</button>
                            </Link>
                        </li>
                    </ul>
                )}
                <div className="div2">
                    <div className="grand-container">
                        <h1>VIEW UNIVERSITIES</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>University Name</th>
                                    <th>Place</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities.map((uni, index) => (
                                    <tr key={index}>
                                        <td>{uni.universityName}</td>
                                        <td>{uni.place}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Uni;
