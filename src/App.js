import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './containers/main';
import store from './components/Admin/store';
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
