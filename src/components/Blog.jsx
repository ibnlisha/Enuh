import {v4 as uuid} from  'uuid';
import BlogItem from './BlogItem';
import './Blog.css'

const Blog = () =>  {
    const blogs = [
        {
            id: uuid(),
            title: 'Stuck on a task? 3 simple routines for getting out of getting stuck',
            coverImage: 'images/blogs/hand-982048_1920.jpg',
            author: 'Enuh Blaise',
            text: '',
            date: new Date(),
            highlight: 'Have you ever stayed stuck on a task for hours without any visible or measurable progress? Often, you have tried every option you know',
            comments: [],
            category: 'Uncategorized',
            reads: ''
        },
        {
            id: uuid(),
            title: 'Making your PhD experience enjoyable',
            coverImage: 'images/blogs/pexels-photo-7942434.jpeg',
            author: 'Enuh Blaise',
            date: new Date(),
            highlight: 'You have probably experienced difficulty working with people, self doubt, rejection, regret or feeling lost and ',
            comments: [],
            category: 'Motivation',
            text: '',
            reads: ''
        }
    ]
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
                <p><span>Week</span> | <span>Month</span></p>
                <div className="pBlogs">
                    Popular blogs will come here
                </div>
                <div className="div">
                    <h3>Subscribe to get notified on every new post</h3>
                    <form action="">
                        {/* <label htmlFor={emailId}>Email Address</label> */}
                        <input type="email" name="email" id={uuid()} 
                        placeholder = 'username@domain.com'/>
                        <input type="submit" value="Subscribe" />
                    </form>
                </div>
            </aside>
        </div>
    )
}

export default Blog;