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

        fetch("http://localhost:8090/api/restaurants/", {
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

    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:8090/api/restaurants")
    //     .then(response => {
    //         if (response.status === 200) {
    //             return response.json();
    //         } else {
    //             alert("Something went wrong while fetching.");
    //             nav("/");
    //         }
    //     })
    //     .then(jsonData => setRestaurants(jsonData))
    //     .catch(rejection => {
    //         alert("Failure: " + rejection.status + ": " + rejection.statusText)
    //         nav("/");
    //     });
        
    //     }, []);

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
        <div className="with-margins">
            <h2>Restaurants</h2>
            <br />
            {restaurantFactory()}
        </div>
    )
}

export default Restaurants;