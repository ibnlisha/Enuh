import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import axios from 'axios'

const BlogItem = ({blog_title, file_path, id, fullWidth,
    first_name, last_name, date_posted, teaser, comments, reads}) =>{
        return(
            <div style = {{
                width: fullWidth? 'calc(100% - 1em)': 'calc(50% - 1em)',
                margin: '0.5em',
            }}>
                <Link to={`/blog/${id}`} onClick = {async () => {
                    await axios.put(`/api/blogs/${id}/edit`, {reads: ++reads})
                }}>
                    <img src={file_path} alt={blog_title} style = {{
                        width: '100%'
                    }}/>
                    <h1 style = {{
                        marginBottom: '0',
                        textDecoration: 'none',
                    }}>{blog_title}</h1>
                </Link>
                <p style ={{
                    margin: '0',
                    fontWeight: 'bold',
                    fontSize: '0.8em',
                    }}>
                    <span>By {`${first_name} ${last_name}`}, </span>
                    <span><Moment fromNow>{date_posted}</Moment></span>
                    {/* {`${months[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`} */}
                    <span> | {reads} read{reads > 1 && 's'}</span>
                </p>
                <p style ={{
                    textAlign: 'left',
                    }}>{teaser}...</p>
            </div>
        )
    }

export default BlogItem;