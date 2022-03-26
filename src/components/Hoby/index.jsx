import './Hoby.css'
import {v4 as uuid} from 'uuid'
import { useEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Hobby = () =>  {
    const [image, setImage] = useState();
    const [data, setData] = useState([])
    useEffect(()=> {
        const getData = async () => {
            const {data} = await axios.get('/api/pencil-arts')
            // console.log(data)
            setData([...data])
        }
        getData()
    })
    
    return(
        <div className="container">
            {image && <div className="modalContainer">
                <div className="modal">
                    <span 
                    className='close'
                    onClick ={e => setImage()}>
                    <FontAwesomeIcon icon = {faTimes} />
                    </span>
                    <div style={{display: 'flex', backgroundColor: 'gray', padding: '0'}}>
                        <img src={image.url} alt={image.description} className = 'showImage'/>
                        <div style={{margin: '1em', color: 'orange'}}>
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                        </div>
                    </div>
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
                        {data.map(({file_path, art_desc, title}) => 
                        <div key = {uuid()} 
                        onClick = {() => {
                            setImage({url: file_path, description: art_desc, title});
                        }}
                        className = 'artImg'>
                            <img src={file_path} alt= {title} style ={{
                                width: '100%',
                            }}/>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hobby;