import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Customer from "./Customer/Customer"
import NotFound from './NotFound';
import jwtDecode from 'jwt-decode';

function App() {

  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState(null);

  function errorHandler(rejectionMessage) {
    console.log(rejectionMessage);
}

  function fetchCustomers() {

    const jwt = localStorage.getItem("token");

    fetch("http://localhost:8090/api/customers", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt
        }
    })
    .then(response => response.json())
    .then(jsonData => setCustomers(jsonData))
    .catch(rejection => () => errorHandler(rejection));
}

  function findCurrentCustomer() {
    let currentCustomer = customers.filter( c => c.customerId === user.userId);
    setCustomer(currentCustomer[0]);
  }
 
  useEffect( () => {
    const jwt_token = localStorage.getItem("token");
    if( jwt_token ){
      setUser({ user: jwtDecode(jwt_token) });
      fetchCustomers();
    }
  }, []);
  
  useEffect( () =>{
    findCurrentCustomer();
  }, [customers])
  

   return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <div className="title">iQueue</div>    
      <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/customer" element={<Customer customerObj={customer} />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;