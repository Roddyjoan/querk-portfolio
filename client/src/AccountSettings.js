import Restaurant from "./Restaurant/Restaurant"
import CurrentCustomer from "./Customer/CurrentCustomer"
import Restaurants from "./Restaurant/Restaurant"
import EditCustomers from "./Customer/EditCustomer"
import EditRestaurant from "./Restaurant/EditRestaurant"
import Customers from "./Customer/Customers"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { useContext } from "react"
import AuthContext from "./AuthContext"

function AccountSettings() {

   const [user, setUser] = useContext(AuthContext);
   const [restaurants, setRestaurants] = useState([]);
   const [customer, setCustomer] = useState([]);
   const { id } = useParams();
   
    useEffect(() => {

        fetch("http://localhost:8090/api/restaurants/", {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => setRestaurants(jsonData))
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });

    }, []);
   
    useEffect(() => {

        fetch("http://localhost:8090/api/customers/" + id, {

        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => setCustomer(jsonData))
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });
    }, []);

    function findUsersRestaurant(){
        return restaurants.filter(res => res.userId === user.userId);
    }

    return (
        <div className="with-margins">
            {user.authorities === "ROLE_OWNER" ? <Restaurant restaurantObj = {findUsersRestaurant()[0]}/> : <CurrentCustomer customerObj = {customer}/>}
        </div>
    )
}

export default AccountSettings;