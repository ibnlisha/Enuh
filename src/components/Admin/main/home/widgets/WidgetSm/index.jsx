import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.css'

const WidgetSm = () => {
  return (
    <div className='wgSm'>
        <h3 className="widgetTitle">Newly Joined Users</h3>
        <ul className="widgetList">
            <li className="widgetListItem">
                <img 
                className='userProfile'
                src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
                alt="User profile" />
                <div className="widgetContainer">
                    <span className="username">Ibn Lisha</span>
                    <span className="job">Accountant</span>
                </div>
                <button className='btn'>
                    <FontAwesomeIcon icon = {faEye} /> Display
                </button>
            </li>
            <li className="widgetListItem">
                <img 
                className='userProfile'
                src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
                alt="User profile 1" />
                <div className="widgetContainer">
                    <span className="username">Ibn Lisha</span>
                    <span className="job">Accountant</span>
                </div>
                <button className='btn'>
                    <FontAwesomeIcon icon = {faEye} /> Display
                </button>
            </li>
            <li className="widgetListItem">
                <img 
                className='userProfile'
                src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
                alt="User profile image2" />
                <div className="widgetContainer">
                    <span className="username">Ibn Lisha</span>
                    <span className="job">Accountant</span>
                </div>
                <button className='btn'>
                    <FontAwesomeIcon icon = {faEye} /> Display
                </button>
            </li>
        </ul>
    </div>
  )
}

export default WidgetSm