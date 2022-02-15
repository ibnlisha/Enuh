import './Hoby.css'
import {v4 as uuid} from 'uuid'
import { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

const Hoby = () =>  {
    const [image, setImage] = useState();
    const images = [
        {
            url: 'images/art/art1.png',
            description: 'Pencil drawing of a girl'
        },
        {
            url: 'images/art/art2.png',
            description: 'Sammurai'
        },
        {
            url: 'images/art/art3.jpg',
            description: 'Guy with 6 pack'
        },
        {
            url: 'images/art/art4.png',
            description: 'Headtie girl'
        },
        {
            url: 'images/art/art5.png',
            description: 'Couple'
        },
        {
            url: 'images/art/art6.png',
            description: 'Pencil drawing of a girl'
        },
    ]
    return(
        <div className="container">
            {image && <div className="modalContainer">
                <div className="modal">
                    <span 
                    className='close'
                    onClick ={e => setImage()}>
                    <FontAwesomeIcon icon = {faTimes} />
                    </span>
                    <img src={image.url} alt={image.description} className = 'img'/>
                </div>
            </div>}
            <div className="hoby">
                <p className="foreword">
                I believe drawing is a place of spiritual connection. 
                The process of being in the moment of every pencil 
                stroke, development of shades, time just seems to stop 
                and you feel a connection with the subject of art.
                </p>
                <div className="sampleDrawings">
                    <h1 className="header">Gallery</h1>
                    <div className="gallery">
                        {images.map(({url, description}) => 
                        <div key = {uuid()} 
                        onClick = {() => {
                            setImage({url, description});
                        }}
                        style = {{
                            flex: '1 1 30%',
                            maxWidth: '35%',
                            margin: '0.5em',
                            cursor: 'pointer'
                        }}
                        >
                            <img src={url} alt= {description} style ={{
                                width: '100%',
                            }}/>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hoby;