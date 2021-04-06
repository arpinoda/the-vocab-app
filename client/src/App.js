import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Login from "./Login";
import Dashboard from "./Dashboard";
import Loading from "./Loading";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setUser(data);
    })
  }, [])

  if (user === null) {
    return <Loading/>
  }
  if (user) {
    return <Dashboard user={user}/>
  }
  return <Login/>
}

export default App;