import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Restaurant from "./Restaurant";

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {
        const jwt = localStorage.getItem( "token" );
        if( jwt ){
            fetch("http://localhost:8090/api/restaurant",{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching.");
            }
        })
        .then(jsonData => setRestaurants(jsonData))
        .catch(rejection => {
            alert("Failure: " + rejection.status + ": " + rejection.statusText)
        });
        }else {
            nav("/login");
        }
    }, []);

    function restaurantFactory() {
        return restaurants.map(restaurantObj => (
            <Restaurant 
                key={restaurantObj.restaurantId} 
                restaurantObj={restaurantObj} 
                restaurants={restaurants}
                setRestaurants={setRestaurants}
            />
        ))
    }

    return (
        <>
            <h2>Restaurants</h2>
            {restaurantFactory()}
        </>
    )
}

export default Restaurants;