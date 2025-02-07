import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './UniAndCor.css';
import { Link, useNavigate } from 'react-router-dom';

const Uni = () => {
    const navigate = useNavigate();
    const [menuToggle, setMenuToggle] = useState(false);
    const [isChildVisibleView, setIsChildVisibleView] = useState(false);
    const [isChildVisibleAdd, setIsChildVisibleAdd] = useState(false);
    
    // State for university data
    const [universityName, setUniversityName] = useState('');
    const [place, setPlace] = useState('');
    const [universities, setUniversities] = useState([]);

    const showMenu = () => {
        setMenuToggle(prevState => !prevState);
    }

    const handleLogOut = async () => {
        await axios.delete("http://localhost:3001/apiu/logout");
        alert("Logged Out");
        navigate('/');
    }

    const goHome = () => {
        navigate('/landing');
    }

    const handleView = async() => {
        setIsChildVisibleView(prevState => !prevState);
        setIsChildVisibleAdd(false);

        const result = await axios.get("http://localhost:3001/apit/uni-view");
        console.log(result.data.data)
        setUniversities(result.data.data);
    }

    const handleAdd = () => {
        setIsChildVisibleAdd(prevState => !prevState);
        setIsChildVisibleView(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:3001/apit/add-uni', {
                universityName,
                place
            });
            alert('Course added successfully!'); // Notify user of success
            setUniversityName('');
            setPlace('');
        } catch (error) {
            console.error('There was an error adding the course!', error);
            alert('Failed to add course. Please try again.'); // Notify user of error
        }
    }

    return (
        <div className="Lan-container">
            <img className='lph' src="https://static.vecteezy.com/system/resources/previews/004/495/548/original/light-soft-color-blue-low-poly-crystal-background-polygon-design-pattern-low-poly-illustration-low-polygon-background-free-vector.jpg" alt="" />
            <nav className="Lan-navbar">
                <button className='menu-btn' onClick={showMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f0ffff">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                    </svg>
                </button>
                <ul className="Lan-nav-links">
                    <li><button className='Lan-homebtn' onClick={goHome}>Home</button></li>
                    <li><button className='profileBtn' onClick={handleLogOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="34px" fill="#fff">
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                        </svg>
                    </button></li>
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
                        <div className="child-container1">
                            VIEW UNIVERSITIES ? click this button<br/>
                            <button className="btn1" onClick={handleView}>View</button><br /><br />
                            ADD UNIVERSITIES ? click this button <br />
                            <button className="btn2" onClick={handleAdd}>Add</button><br />
                        </div>
                        {isChildVisibleView && (
                            <div className="child-container2">
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
                        )}
                        {isChildVisibleAdd && (
                            <div className="child-container2">
                                <h1>ADD UNIVERSITY</h1>
                                <form onSubmit={handleSubmit}>
                                    <input 
                                        type="text" 
                                        placeholder="University Name" 
                                        value={universityName} 
                                        onChange={(e) => setUniversityName(e.target.value)} 
                                        required 
                                    /> <br /> <br />
                                    <input 
                                        type="text" 
                                        placeholder="Place" 
                                        value={place} 
                                        onChange={(e) => setPlace(e.target.value)} 
                                        required 
                                    /> <br /> <br />
                                    <button type="submit">Add University</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uni;
