import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBlog, faChartLine, faComments, faDraftingCompass, faEnvelope, 
     faHandPaper, faPencilAlt, faRssSquare, 
    faTh, faUsers} from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sideBar">
        <div className="sidebarwrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashbord</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to = '/admin' className='link'>
                            <FontAwesomeIcon icon = {faTh}/>
                            Home
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <FontAwesomeIcon icon = {faChartLine}/>
                        Analysis
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick menu</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                       <Link to = '/admin/subscriber-list' className='link'>
                       <FontAwesomeIcon icon = {faUsers}/>
                        Subscribers
                        </Link> 
                    </li>
                    <li className="sidebarListItem">
                        <Link to = '/admin/publications' className='link'>
                        <FontAwesomeIcon icon = {faHandPaper}/>
                        Articles</Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to = '/admin/blogs' className='link'>
                        <FontAwesomeIcon icon = {faBlog}/>
                        Blogs</Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to = '/admin/graphics' className='link'>
                        <FontAwesomeIcon icon = {faDraftingCompass}/>
                        Graphics
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to='/admin/pencil-arts' className='link'><FontAwesomeIcon icon = {faPencilAlt}/>
                        Pencil art</Link>
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <FontAwesomeIcon icon = {faEnvelope}/>
                        Mail notifications
                    </li>
                    <li className="sidebarListItem">
                        <FontAwesomeIcon icon = {faRssSquare}/>
                        Feedback
                    </li>
                    <li className="sidebarListItem">
                        <FontAwesomeIcon icon = {faComments}/>
                        Comments
                    </li>
                </ul>
            </div>
        </div>
    </aside>
  )
}

export default Sidebar;