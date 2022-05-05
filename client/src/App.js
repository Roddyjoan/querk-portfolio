import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Customer from "./Customer/Customer"
import Customers from './Customer/Customers';
import NotFound from './NotFound';
import jwtDecode from 'jwt-decode';
import RequestPage from './Signup/RequestPage';
import AddUserForm from './Signup/AddUserForm';
import AddRestaurantForm from './Signup/AddRestaurantForm';
import Restaurants from './Restaurant/Restaurants';
import AccountSettings from './AccountSettings';
import Queue from './Restaurant/Queue';
import Items from './Item/Items';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import About from './About';
import EditCustomer from './Customer/EditCustomer';

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
            {/* <Route path="/customer" element={<Customer customerObj={customer} />} /> */}
            <Route path="/customers/:id" element={<EditCustomer />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/signup" element={<RequestPage />} />
            <Route path="/signup/customer" element={<AddUserForm />} />
            <Route path="/signup/owner" element={<AddRestaurantForm />} />
            <Route path="/restaurantform" element={<AddRestaurantForm />} />
            <Route path="/customerform" element={<AddUserForm />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
            <Route path="/restaurant/queue/:id" element={<Queue />} />
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