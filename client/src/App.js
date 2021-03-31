import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Home from "./Home";
import Profile from "./Profile";
import Loading from "./Loading";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/auth/current-session').then(({data}) => {
      setUser(data);
    })
  }, [])

  if (user === null) {
    return <Loading/>
  }
  if (user) {
    return <Profile user={user}/>
  }
  return <Home/>
}

export default App;