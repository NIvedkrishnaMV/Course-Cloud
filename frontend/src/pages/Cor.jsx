import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './UniAndCor.css';
import { Link, useNavigate } from 'react-router-dom';

const Cor = () => {
    const navigate = useNavigate();
    const [menuToggle, setMenuToggle] = useState(false);
    const [isChildVisibleView, setIsChildVisibleView] = useState(false);
    const [isChildVisibleAdd, setIsChildVisibleAdd] = useState(false); // New state for visibility

    const showMenu = () => {
        setMenuToggle(prevState => !prevState);
    }

    const handlepro = () => {
        navigate('/profile');
    }

    const handleLogOut = async () => {
        await axios.delete("http://localhost:3001/apiu/logout");
        alert("Logged Out");
        navigate('/');
    }

    const goHome = () => {
        navigate('/landing');
    }

    const handleView = () => {
        setIsChildVisibleView(prevState => !prevState);
        setIsChildVisibleAdd(false); // Show child-container2
    }

    const handleAdd = () => {
        setIsChildVisibleAdd(prevState => !prevState);
        setIsChildVisibleView(false); // Show child-container2
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
                            VIEW COURSES ? click this button<br/>
                            <button className="btn1" onClick={handleView}>View</button><br /><br />
                            ADD COURSES ? click this button <br />
                            <button className="btn2" onClick={handleAdd}>Add</button><br />
                        </div>
                        {isChildVisibleView && <div className="child-container2">View</div>} 
                        {isChildVisibleAdd && <div className="child-container2">Add</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cor;
