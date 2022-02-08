import {Route, Routes} from 'react-router-dom'
import Home from '../components/Home'

const Main = () => {
    return (
        <div>
           <Routes>
               <Route exact path = '/' element = { <Home />} />
            </Routes> 
        </div>
    );
}

export default Main;
