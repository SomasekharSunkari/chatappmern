
import './App.css';

import axios from 'axios';
import Routes from './Components/Routes';
import UserContextProvider from './Components/Register/UserContext';
function App() {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
  return (
   <UserContextProvider>
    
        <Routes />

    
     </UserContextProvider>

  );
}

export default App;
