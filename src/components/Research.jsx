import Article from "./Article";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Research.css'
import publications from "../utils/Publications";
import { useState } from "react";

const Research = () =>  {
    // const [showPapers, setShowPapers] = useState(publications.slice(0,3));
    const [nav, setNav] = useState({start: 0, stop: 3})
    const showPapers = publications.slice(nav.start, nav.stop);
    return(
        <div className="container">
           <div className = 'research' >
            <div className="intro">
                <img src="images/microscope.jpeg" alt="microscope slide" 
                className="microscope"
                />
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
            <h1 className="header">Publications</h1>
            <div className="publications">
                <span className="chev chevronLeft"
                onClick = {e => {
                    if(nav.start > 0) setNav({start: --nav.start, stop: --nav.stop})
                }}
                ><FontAwesomeIcon icon = {faChevronLeft}/></span>
                <span 
                onClick = {e => {
                    if(nav.stop < publications.length) setNav({start: ++nav.start, stop: ++nav.stop})
                }}
                className="chev chevronRight"
                ><FontAwesomeIcon icon = {faChevronRight}/></span>
                {showPapers.map(paper => <Article {...paper}/>)}
            </div>
           </div>
        </div>
    )
}

export default Research;