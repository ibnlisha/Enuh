import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMicroscope, faBlog, faAtom, faShapes, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const hide = e => setCollapsed(true);
    // console.log(collapsed)
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
                <FontAwesomeIcon icon = {!collapsed? faTimes: faBars}/>
            </div>
            <ul className = {collapsed? 'nav-items-mobile': 'nav-items'}>
                <li className = 'nav-item'
                onClick = {hide}
                ><Link to = '/research'><FontAwesomeIcon icon = {faMicroscope}/>Research</Link></li>
                <li className = 'nav-item'
                 onClick = {hide}
                ><Link to = '/blog'><FontAwesomeIcon icon = {faBlog}/>Blog</Link></li>
                <li className = 'nav-item'
                 onClick = {hide}
                ><Link to = '/science-communication'><FontAwesomeIcon icon = {faAtom}/>Science Communication</Link></li>
                <li className = 'nav-item'
                 onClick = {hide}
                ><Link to = '/hobby'><FontAwesomeIcon icon = {faShapes}/>Hobby</Link></li>
            </ul>
        </nav>
        <div className="deco d1"></div>
        <div className="deco d2"></div>
        <div className="deco d3"></div>
        </div>
    );
}

export default Navbar;
