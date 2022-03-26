// import { useState } from "react"

const Card = ({idx, file_path, title, isSelected, show, clickable}) =>{
    // const [isSelected, select] = useState(false);
    const border = isSelected? '5px solid brown' : 'none'
    // console.log('isSelected = ', isSelected);
    return (<div 
        // role = 'button'
        onClick = { e => {
            show(idx)
        }}
        style = {{
            cursor: clickable? 'pointer': 'inherit',
            margin: '0.3em',
            flex: '1 1 20%',
            backgroundColor: 'whitesmoke',
            borderRadius: '0.5em',
            border: border
        }}>
            <div>
                <img src={file_path} alt={title} 
                style = {{
                    width: '100%',
                    borderRadius: '0.5em'
                }}/>
            </div>
            <h3 >{title}</h3>
        </div>)
}

export default Card;