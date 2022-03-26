import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import './Home.css'

const Home = () => {
  //get all subscribers
  return (
    <div className="home">
        <div className="featuredItem">
        <span className="featuredTitle">Readers</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$3.15</span>
            <span className="featuredMoneyRate negative">-8.62
            <FontAwesomeIcon icon = {faArrowDown} />
            </span>
        </div>
        <span className="featuredSubtitle">Compared to last month</span>
        </div>  
        <div className="featuredItem">
        <span className="featuredTitle">Subscribers</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$5.15</span>
            <span className="featuredMoneyRate positive">+10.2
            <FontAwesomeIcon icon = {faArrowUp} />
            </span>
        </div>
        <span className="featuredSubtitle">Compared to last month</span>
        </div>  
        <div className="featuredItem">
        <span className="featuredTitle">Comments</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$3.15</span>
            <span className="featuredMoneyRate positive">+8.62
            <FontAwesomeIcon icon = {faArrowUp} />
            </span>
        </div>
        <span className="featuredSubtitle">Compared to last month</span>
        </div> 
    </div>
  )
}

export default Home