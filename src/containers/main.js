import {Route, Routes, useLocation} from 'react-router-dom'
import HomeMain from '../components/HomeMain'
import Blog from '../components/Blog'
import Research from '../components/Research'
import ScienceCom from '../components/ScienceCommunication'
import Hoby from '../components/Hoby'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogDetail from '../components/Blog/BlogDetail'
import AdminPage from '../components/Admin/AdminPage'


const Main = () => {
    const location = useLocation();
    return (
        <div style = {{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            {!location.pathname.includes('admin') && <Navbar />}
           <div style = {{
               flex: '1'
           }}>
           <Routes>
               <Route exact path = '/' element = { <HomeMain />} />
               <Route exact path = '/blog' element = { <Blog />} />
               <Route exact path = '/blog/:id' element = { <BlogDetail />} />
               <Route exact path = '/research' element = { <Research />} />
               <Route exact path = '/hobby' element = { <Hoby />} />
               <Route exact path = '/science-communication' element = { <ScienceCom />} />
               <Route exact path = '/admin/*' element = { <AdminPage />} />
            </Routes> 
           </div>
           {!location.pathname.includes('admin') && <Footer />}
        </div>
    );
}

export default Main;
