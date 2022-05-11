import CurrentRestaurant from "./Restaurant/CurrentRestaurant";
import CurrentCustomer from "./Customer/CurrentCustomer";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

function AccountSettings() {

   const [user, setUser] = useContext(AuthContext);
   const [restaurant, setRestaurant] = useState([]);
   const [customer, setCustomer] = useState([]);
   
   function fetchRestaurant(){
    fetch("http://localhost:8090/api/restaurants/" + user.user.jti, {
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Could not fetch restaurant.");
            }
        })
        .then(jsonData => setRestaurant(jsonData))
        .catch(rejection => {
            alert("Failure: " + rejection.status + ": " + rejection.statusText)
        });

        return <CurrentRestaurant restaurantObj = {restaurant}/>
    }

    function fetchCustomer(){
        fetch("http://localhost:8090/api/customers/" + user.user.jti, {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Could not fetch customer.");
                }
            })
            .then(jsonData => setCustomer(jsonData))
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });

            return <CurrentCustomer customerObj = {customer}/>
    }

    // function findUsersRestaurant(){
    //     return restaurants.filter(res => res.userId === user.userId);
    // }

    return (
        <div className="with-margins">
            {user.user.authorities === "ROLE_OWNER" ? fetchRestaurant() : fetchCustomer()}
        </div>
    )
}

export default AccountSettings;