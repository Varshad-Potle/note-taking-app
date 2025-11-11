import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import {useState} from 'react';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import NoteState from './Context/notes/notestate'; 
import Alert from './components/Alert';
import Login from './components/login'; // 
import Signup from './components/signup';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route
            exact
            path="/about"
            element={<div>This is the about section</div>}
          />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
