import {v4 as uuid} from  'uuid';
import BlogItem from './BlogItem';
import './Blog.css'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Blog = () =>  {
    const [blogs, setBlogs] = useState([])
    const [success, setSuccess] = useState(false)
    const [interval, setInterval] = useState(7)
    const popularBlogs = blogs && blogs.filter(({date_posted})=>{
        const date = new Date()
        date.setDate(date.getDate() - interval)
        const dateOfBlog = new Date(date_posted)
        return dateOfBlog >= date
    }).sort((a,b)=> b.reads - a.reads)
    const [subscriber, setSubscriber] = useState({
        name_of_subscriber: '',
        email: ''
    })
    useEffect(()=> {
        const getBlogs = async () => {
            const {data} = await axios.get('/api/blogs')
            const sortedData = data.sort((a,b)=> {
                const da = new Date(a.date_posted)
                const db = new Date(b.date_posted)
                return db - da 
            })
            setBlogs([...sortedData])
        }
        getBlogs()
    }, [setBlogs])
    const onchange = e => {
        const temp = {...subscriber}
        temp[e.target.name] = e.target.value
        setSubscriber({...temp})
    }
    const subscribe = async e => {
        e.preventDefault()
        try {
            await axios.post('/api/subscription/new', subscriber)
            setSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="container">
            <div className="jombutron">
                <h2>Together let's learn about the various aspects of 
                personal development each week.</h2>
            </div>
            <section className="blogs">
                <h1 className="header">Latest Blogs</h1>
                <div className="blogItems">
                    {blogs.map(blog => <BlogItem key = {uuid()} {...blog}/>)}
                </div>
            </section>
            <aside className="selected">
                <h1 className="header">Trending</h1>
                <p><span onClick = { e => setInterval(7)} 
                style={{cursor: 'pointer'}}>
                <strong>This week</strong></span> | <span
                style={{cursor: 'pointer'}}
                onClick = { e => setInterval(30)}
                ><strong>This month</strong></span></p>
                <div className="pBlogs">
                    {popularBlogs.map(blog => <BlogItem key = {blog.id}
                    fullWidth
                    {...blog}/>)}
                </div>
                <div className="div">
                    {!success? <>
                    <h3>Subscribe to get notified on every new post</h3>
                    <form onSubmit={subscribe}>
                        <input type='text' name ='name_of_subscriber'
                        onChange={onchange}
                        placeHolder = 'Name' required/>
                        <input type="email" name="email" id={uuid()} 
                        placeholder = 'username@domain.com' required
                        onChange={onchange}/>
                        <input type="submit" value="Subscribe" />
                    </form>
                    </>: <p>Thank you for subscribing to our blog</p>}
                </div>
            </aside>
        </div>
    )
}

export default Blog;