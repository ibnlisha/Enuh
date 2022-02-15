// import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () =>{
    const brandsStyle = {
        color: 'white',
        fontSize: '2em',
    }
    const margin = {
        margin: '1em'
    }
    const grow = {
        flex: '1'
    }
    return (
        <div className="container" style ={{
            // flexDirection: 'column',
            flexWrap: 'wrap',
            marginBottom: '0',
            color: 'white',
            width: '100%',
        }}>
            <div style = {{
                display: 'flex',
                flexWrap: 'wrap',
                paddingTop: '1em',
                width: '80%',
                margin: '0 auto',
            }}>
                <div style={grow}>
                    <h3>Services</h3>
                    <ul style = {{
                        textAlign: 'left',
                    }}>
                        <li>Drawing figures for Journal publications</li>
                        <li>Drawing for life sciences</li>
                        <li>Image adaptation</li>
                    </ul>
                </div>
                <hr />
                <div style={grow}>
                    <h4>Contact us Here</h4>
                    <a href = 'tel:+90543*******' style ={{color: 'white'}}><FontAwesomeIcon icon={faPhone} style = {brandsStyle}/>+90 543 *** ****</a>
                </div>
                <hr />
                <div style={grow}>
                    <h4>Follow me on</h4>
                    <a style = {margin} href = 'https://www.linkedin.com/in/enuhblaisemanga/?originalSubdomain=tr' target = '_blank' rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} style = {brandsStyle} /></a>
                    <a style = {margin} href = 'https://de-de.facebook.com/public/Enuh-Blaise' target = '_blank' rel="noreferrer"><FontAwesomeIcon icon={faFacebook} style = {brandsStyle}/></a>
                    <a style = {margin} href = 'https://twitter.com/enuhblaise' target = '_blank' rel="noreferrer"><FontAwesomeIcon icon={faTwitter} style = {brandsStyle}/></a>
                    <a style = {margin} href = 'https://www.instagram.com/blaisonyl_0/?hl=en' target = '_blank' rel="noreferrer"><FontAwesomeIcon icon={faInstagram} style = {brandsStyle}/></a>
                </div>
            </div>
            <hr style = {{width: '80%'}}/>
            <p style ={{width: '100%'}}>Copyright&copy;2022</p>
        </div>
    )
}

export default Footer;