import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './containers/main';

function App() {
  return (
    <Router>
      <div className="App">
        <Main />
      </div>
    </Router>
  );
}

export default App;
