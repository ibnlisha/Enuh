import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const BlogDetail = () => {
    const [blog, setBlog] = useState({})
    const {id} = useParams()
    useEffect(()=> {
        const getBlog = async () => {
            const {data} = await axios.get(`/api/blogs/${id}`)
            setBlog(data)
        }
        getBlog()
    })
    return <div className="container">
        <div 
        className="blog"
        dangerouslySetInnerHTML={{ __html: blog.post }} 
        />
        <form style = {{width: '80%', margin: '1em auto', }}>
            <h1>Leave a comment</h1>
            <textarea name="comment" id="" cols="30" 
            placeholder="Say something" className="formControl"
            rows="10"></textarea>
            <input type="submit" className = 'btn' value="Submit" style={{
                backgroundColor: 'orangered'
            }}/>
        </form>
    </div>
}
export default BlogDetail;