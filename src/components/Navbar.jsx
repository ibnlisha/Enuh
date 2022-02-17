import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMicroscope, faBlog, faAtom, faShapes, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const hide = e => setCollapsed(true);
    const location = useLocation();

    const navs = [
        {
            name: 'Research',
            pathname: '/research',
            icon: faMicroscope
        },
        {
            name: 'Blog',
            pathname: '/blog',
            icon: faBlog
        },
        {
            name: 'Science Communication',
            pathname: '/science-communication',
            icon: faAtom
        },
        {
            name: 'Hobby',
            pathname: '/hobby',
            icon: faShapes
        }
    ]
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
                {navs.map(({name, pathname, icon}) => 
                <li onClick = {hide}
                className='nav-item'><Link to = {pathname} style = {{
                    backgroundColor: pathname === location.pathname? 'maroon': 'inherit'
                }}>
                <FontAwesomeIcon icon = {icon} />{name}
                </Link></li>
                )}
            </ul>
        </nav>
        <div className="deco d1"></div>
        <div className="deco d2"></div>
        <div className="deco d3"></div>
        </div>
    );
}

export default Navbar;
