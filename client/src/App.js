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
import AddRestaurantForm from './Signup/AddRestaurantForm';
import Restaurants from './Restaurant/Restaurants';
import AccountSettings from './AccountSettings';
import JoinQueue from './Restaurant/JoinQueue';
import Items from './Item/Items';
import About from './About';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';

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
    .then(response => {
      if(response.status === 200){
        return response.json();
      } else {
        console.log(response);
      }
    })
    .then(jsonData => setCustomers(jsonData))
    .catch(rejection => () => errorHandler(rejection));
}

  function findCurrentCustomer() {

    if(customers){
      let currentCustomer = customers.filter( c => c.customerId === user.userId);
      setCustomer(currentCustomer);
    }

  }
 
  useEffect( () => {
    const jwt_token = localStorage.getItem("token");
    if( jwt_token ){
      setUser({ user: jwtDecode(jwt_token) });
      fetchCustomers();
    }
  }, []);
  
  useEffect( () =>{
    // findCurrentCustomer();
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
            <Route path="/signup" element={<RequestPage />} />
            <Route path="signup/customer" element={<AddUserForm />} />
            <Route path="signup/owner" element={<AddRestaurantForm />} />
            <Route path="/restaurantform" element={<AddRestaurantForm />} />
            <Route path="/customerform" element={<AddUserForm />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
            <Route path="/joinqueue" element={<JoinQueue />} />
            <Route path="/menu/:id" element={<Items />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;