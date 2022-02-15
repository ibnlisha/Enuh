import './ScienceCommunication.css'
import Card from './Card';
import {v4 as uuid} from 'uuid'
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import backgroundImage from 'images/jumbotronImg.jpg'

const Research = () =>  {
    // const [show, setShow] = useState(false);
    // const showModal = e => setShow(true);
    const handleImage = (imgId) => {
        // const image = gallery.find(({id})=> id=== imgId)
        const updateGallery = gallery.map(image => {
            if(image.id === imgId) {
                setShowImage(image);
                image.isSelected = true;
            }else{
                image.isSelected = false;
            }
            return image;
        })
        setGallery(updateGallery)
    }
    const images = [
        {
            id : uuid(),
            url: 'images/cellmembrane.png',
            caption: 'Cell Membrane',
            isSelected: true
        },
        {
            id : uuid(),
            url: 'images/test1.png',
            caption: 'Test 1',
            isSelected: false,
        },
        {
            id : uuid(),
            url: 'images/test2.jpeg',
            caption: 'Test 2',
            isSelected: false,
        },
        {
            id : uuid(),
            url: 'images/pfizer-test.png',
            caption: 'Pfizer test',
            isSelected: false,
        },
        
    ]
    const [gallery, setGallery] = useState(images);
    const [showImage, setShowImage] = useState(images[0]);
    return(
        <div className="container" >
            <div className="resr" style = {{
            backgroundImage: `url(images/jumbotronImg.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        }}>
            {/* {showImage && <div className='modal'>
                <p className="close" 
                onClick = { e => setShowImage()}
                ><FontAwesomeIcon icon = {faTimes} /></p>
                <img src={showImage.url} alt={showImage.caption} style ={{width: '100%'}}/>
                </div>} */}
            <div className="briefOverview">
                <img src="images/microscope.jpeg" alt="microscope slide" />
                <p>I am a PhD candidate in Biotechnology and Biosafety. 
                    My skills are in Genomic Data Science and Molecular 
                    Biology, Science communication and Biotechnology. 
                    My interest is in the development of microbial platforms 
                    for the production of sustainable bio products through 
                    metabolic engineering. Specifically the use of Genome 
                    Scale Model for the simulation of microbial metabolism 
                    engineering . Using this technology we wan to develop 
                    models that will guide engineering strategies towards 
                    higher yields of bioproducts. I also research bacteria 
                    genomes as a genomic data scientist to assess the 
                    biotechnology potential of mesophilic and extremophilic 
                    microorganisms. We do this by using several computational 
                    pipelines and methods in the linux commandline, Web 
                    programs, and using code in R, and Python.</p>
                    <hr />
            </div>
                <div className="jumbotron">
                    <h1 className="header">Science communication through graphics</h1>
                    <h2>Science gallery</h2>
                </div>
                <div className="canvas">
                <h1 className="header">Sample Drawings</h1>
                <div className="display">
                   {showImage &&  <Card {...showImage} />}
                </div>
                    {gallery.map(val => 
                    <Card {...val} caption = '' show = {handleImage} key = {val.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default Research;