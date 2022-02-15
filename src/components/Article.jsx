// import Link from 'react-router-dom';

const Article = ({abstract, title, authors, date, url}) => (
    <div style={{
        maxWidth: '35%',
        flex: '1 0 30%',
        margin: '0.5em',
        borderTop: '0.2em solid darkslateblue',
        // color: 'whitesmoke',
    }}>
        <a href = {url} target = '_blank' rel="noreferrer">
            <img src={abstract} alt='graphical abstract' style = {{
                maxWidth: '100%',
                maxHeight: '10em',
            }} />
            <h3 className="title">{title}</h3>
        </a>
        <p>{authors}</p>
        <p>{date}</p>
    </div>
    
)

export default Article;