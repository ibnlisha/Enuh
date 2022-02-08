import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMicroscope, faBlog, faAtom, faShapes } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='container'>
            
            <div className="brandName">
                <Link to = '/'>
                <img src = 'https://enuhblaise.files.wordpress.com/2021/10/enuh-b.-manga-1.png' 
                alt = 'brand name' width = '120' />
                </Link>
            </div>
            
            <nav className='nav'>
            <div className="menuIcon" 
            onClick = {e => setCollapsed(!collapsed)}
            >
                <FontAwesomeIcon icon = {collapsed? faWindowClose: faBars}/>
            </div>
            {collapsed &&
            <ul className = 'nav-items'>
            <li className = 'nav-item'><Link to = '#'><FontAwesomeIcon icon = {faMicroscope}/>Research</Link></li>
            <li className = 'nav-item'><Link to = '#'><FontAwesomeIcon icon = {faBlog}/>Blog</Link></li>
            <li className = 'nav-item'><Link to = '#'><FontAwesomeIcon icon = {faAtom}/>Science Communication</Link></li>
            <li className = 'nav-item'><Link to = '#'><FontAwesomeIcon icon = {faShapes}/>Hobby</Link></li>
            </ul>}
        </nav>
        </div>
    );
}

export default Navbar;
