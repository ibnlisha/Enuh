// import Link from 'react-router-dom';
import {months} from '../../utils/months'

const Article = ({file_path, title, authors,
     date_of_publication, article_path}) => {
         const date = new Date(date_of_publication)
    return (
        <div style={{
            maxWidth: '35%',
            flex: '1 0 30%',
            margin: '0.5em',
            borderTop: '0.2em solid darkslateblue',
            // color: 'whitesmoke',
        }}>
            <a href = {article_path} target = '_blank' rel="noreferrer">
                <img src={file_path} alt='graphical abstract' style = {{
                    maxWidth: '100%',
                    maxHeight: '10em',
                }} />
                <h3 className="title">{title}</h3>
            </a>
            <p>{authors[0]}, et al.</p>
            <p>{months[date.getMonth() + 1]}, {date.getFullYear()}</p>
        </div>
        
    )
}

export default Article;