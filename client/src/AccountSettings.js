import CurrentRestaurant from "./Restaurant/CurrentRestaurant";
import CurrentCustomer from "./Customer/CurrentCustomer";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

function AccountSettings() {

   const [user, setUser] = useContext(AuthContext);
   const [restaurant, setRestaurant] = useState([]);
   const [customer, setCustomer] = useState([]);
   
   function fetchRestaurant(){

    let api_url = process.env.REACT_APP_API_URL;

    fetch(api_url + "api/restaurants/" + user.user.jti, {
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

        console.log(user.user.authorities);
        console.log(user.user.jti);
        
        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/customers/" + user.user.jti, {

        })
            .then(response => {
                if (response.ok) {
                    console.log(restaurant.restaurantId)
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
            
            {user.user.authorities === "ROLE_OWNER" ? 
                <>
                <Link to={"/add/item/" + restaurant.restaurantId} ><button >Add an item to your menu!</button></Link>
                </>
            
            : ""}
        </div>
    )
}

export default AccountSettings;