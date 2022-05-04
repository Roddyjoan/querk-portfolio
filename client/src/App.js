import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Customer from "./Customer/Customer"
import NotFound from './NotFound';
import jwtDecode from 'jwt-decode';
import RequestPage from './Signup/RequestPage';
import AddUserForm from './Signup/AddUserForm';

function App() {

  const [user, setUser] = useState(null);
 
  useEffect( () => {
    const jwt_token = localStorage.getItem("token");
    if( jwt_token ){
      setUser({ user: jwtDecode(jwt_token) });
    }
  }, []);

   return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <div className="title">iQueue</div>    
      <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/signup" element={<RequestPage />} />
            <Route path="/signup/customer" element={<AddUserForm />} />
            
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;