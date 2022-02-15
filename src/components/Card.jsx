// import { useState } from "react"

const Card = ({id, url, caption, show, isSelected}) =>{
    // const [isSelected, select] = useState(false);
    const border = isSelected? '5px solid darkslateblue' : 'none'
    // console.log('isSelected = ', isSelected);
    return (<div 
        // role = 'button'
        onClick = { e => {
            show(id)
            // select(true);
        }}
        style = {{
            cursor: 'pointer',
            margin: '0.3em',
            flex: '1 1 20%',
            backgroundColor: 'whitesmoke',
            borderRadius: '0.5em',
            border: border
        }}>
            <div>
                <img src={url} alt={caption} 
                style = {{
                    width: '100%',
                    borderRadius: '0.5em'
                }}/>
            </div>
            <h3 >{caption}</h3>
        </div>)
}

export default Card;