import './WidgetLg.css'

const WgLg = () => {
  const Button = ({type}) => 
  <button className={`wgLgBtn ${type}`}>{type}</button>
  return (
    <div className='wgLg'>
      <h3 className="wgTitle">Latest transactions</h3>
      <table className="wgTable">
        <tr className='wgTr'>
          <th className='wgTh'>Customer</th>
          <th className='wgTh'>Amount</th>
          <th className='wgTh'>Date</th>
          <th className='wgTh'>Status</th>
        </tr>
        <tr className="wgTr">
          <td className="userInfo">
            <img className='wgTdImg' 
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
            alt="User profile image0" />
            <p>Username</p>
          </td>
          <td className="wgTd tdAmount">$19.99</td>
          <td className="wgTd tdDate">July 2, 2021</td>
          <td className="wgTd"><Button type = 'Approved' /></td>
        </tr>
        <tr className="wgTr">
          <td className="userInfo">
            <img className='wgTdImg' 
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
            alt="User profile image1" />
            <p>Username</p>
          </td>
          <td className="wgTd tdAmount">$19.99</td>
          <td className="wgTd tdDate">July 2, 2021</td>
          <td className="wgTd"><Button type = 'Approved' /></td>
        </tr>
        <tr className="wgTr">
          <td className="userInfo">
            <img className='wgTdImg' 
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
            alt="User profile image2" />
            <p>Username</p>
          </td>
          <td className="wgTd tdAmount">$19.99</td>
          <td className="wgTd tdDate">July 2, 2021</td>
          <td className="wgTd"><Button type = 'Pending' /></td>
        </tr>
        <tr className="wgTr">
          <td className="userInfo">
            <img className='wgTdImg' 
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg" 
            alt="User profile image3" />
            <p>Username</p>
          </td>
          <td className="wgTd tdAmount">$19.99</td>
          <td className="wgTd tdDate">July 2, 2021</td>
          <td className="wgTd"><Button type = 'Declined' /></td>
        </tr>
      </table>
    </div>
  )
}

export default WgLg