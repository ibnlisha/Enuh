import {Link} from 'react-router-dom'

const BlogItem = ({title, coverImage, id,
    author, date, highlight, comments, category}) =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return(
            <div style = {{
                width: 'calc(50% - 1em)',
                margin: '0.5em',
            }}>
                <Link to={`/blog/${id}`}>
                    <img src={coverImage} alt={title} style = {{
                        width: '100%'
                    }}/>
                    <h1 style = {{
                        marginBottom: '0',
                        textDecoration: 'none',
                    }}>{title}</h1>
                </Link>
                <p style ={{
                    margin: '0',
                    fontWeight: 'bold',
                    fontSize: '0.8em',
                    }}>
                    <span>{author} |</span>
                    <span>{`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`} |</span>
                    <span>{category} |</span>
                    <span>{comments.length} Comments</span>
                </p>
                <p style ={{
                    textAlign: 'left',
                    }}>{highlight}...</p>
            </div>
        )
    }

export default BlogItem;