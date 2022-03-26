import './ScienceCommunication.css'
import Card from './Card';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Research = () =>  {
    const [data, setData] = useState([])
    const [selIdx, setSelIdx] = useState(0)
    const [showImage, setShowImage] = useState(data[0])
    useEffect(()=>{
        const getData = async () => {
            const {data} = await axios.get('/api/scientific-drawings')
            setData([...data])
        }
        getData()
    },[setData])
    const handleImage = (idx) => {
        setShowImage(data[idx])
        setSelIdx(idx)
    }
    return(
        <div className="container" >
            <div className="resr" style = {{
            backgroundImage: `url(images/jumbotronImg.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        }}>
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
                    {data.map((val, idx) => 
                    <Card {...val} clickable 
                    isSelected={idx === selIdx}
                    show = {handleImage} idx = {idx} key = {val.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default Research;