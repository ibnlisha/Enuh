import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBell,} from '@fortawesome/free-solid-svg-icons'
import './Admin.css'
import Sidebar from './sidebar/Sidebar'
import Content from './main/home/Content'
import {Routes, Route} from 'react-router-dom'
import UserList from './main/userlist'
import Graphics from './main/graphics'
import GraphicForm from './main/graphics/form'
import GraphicEditForm from './main/graphics/Edit'
import PencilArt from './main/arts'
import Articles from './main/articles'
import EditArtPiece from './main/arts/Edit'
import CreateArtPiece from './main/arts/create'
import CreateArticle from './main/articles/createArticle'
import EditArticle from './main/articles/Edit'
import Blogs from './main/blogs'
import CreateBlog from './main/blogs/Create'
import EditBlog from './main/blogs/Edit'
import axios from 'axios'
import { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { addCurrentUser } from './store/features/currentUser'

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    useSelector(state => state.currentUser.isAuthenticated)
  ) 
  // console.log(useSelector(state => state))
  const [user, setUser] = useState({
    username: '',
    user_password: ''
  })
  const dispatch = useDispatch()
  const handleChange = e => {
    const temp = {...user}
    temp[e.target.name] = e.target.value
    setUser(temp)
  }
  const login = async e => {
    e.preventDefault()
    const {data} = await axios.post('/api/authentication/signin', user)
    //store user info in the redox state
    dispatch(addCurrentUser({userInfo: data}))
    //reloads the page
    setIsAuthenticated(!!Object.keys(data).length)
  }
  return (
    <div className="adminContainer">
      {isAuthenticated? <>
        <div className="topBar">
            <div className="brand">Enuh</div>
            <nav className="nav">
                {/* <li
                className = 'notifn'
                ><FontAwesomeIcon icon = {faGlobe} />
                <span className="badge">19+</span>
                </li> */}
                <li className = 'notifn'><FontAwesomeIcon icon = {faBell} />
                <span className="badge">19+</span>
                </li>
                {/* <li className='profile'><FontAwesomeIcon icon = {faCog} /></li> */}
                {/* <li className='profile'><FontAwesomeIcon icon = {faUser} /></li> */}
                {isAuthenticated &&
                <li><button 
                onClick={()=>{
                  dispatch(addCurrentUser({userInfo: {}}))
                  setIsAuthenticated(false)
                }}
                className='btn outline'>Logout</button></li>
              }
            </nav>
        </div>
        <main className="main">
            <Sidebar />
            <Routes>
              <Route exact path = '/' element = {<Content />} />
              <Route exact path = '/subscriber-list' element = {<UserList />} />
              <Route exact path = '/graphics' element = {<Graphics />} />
              <Route exact path = '/graphics/new' element = {<GraphicForm />} />
              <Route exact path = '/graphics/:id/edit' element = {<GraphicEditForm />} />
              <Route exact path = '/pencil-arts' element = {<PencilArt />} />
              <Route exact path = '/pencil-arts/new' element = {<CreateArtPiece />} />
              <Route exact path = '/pencil-arts/:id/edit' element = {<EditArtPiece />} />
              <Route exact path = '/publications' element = {<Articles />} />
              <Route exact path = '/publications/new' element = {<CreateArticle />} />
              <Route exact path = '/publications/:id/edit' element = {<EditArticle />} />
              <Route exact path = '/blogs' element = {<Blogs />} />
              <Route exact path = '/blogs/new' element = {<CreateBlog />} />
              <Route exact path = '/blogs/:id/edit' element = {<EditBlog />} />
            </Routes>
        </main>
        </>: <form style ={{
          width: '50%',
          margin: '5em auto',
          textAlign: 'left'
        }} onSubmit = {login}>
            <h1>Admin login</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name ='username' id='username'
            className='formControl'
            onChange ={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="user_password" 
            className='formControl'
            id="password" onChange={handleChange}/>
            <button type="submit" className='btn'>Login</button>
          </form>}
    </div>
    )
}

export default AdminPage;
