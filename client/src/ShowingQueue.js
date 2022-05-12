import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


function ShowingQueues() {
    const [user, setUser] = useContext(AuthContext);
    const [restaurantId, setRestaurantId] = useState("");
    const [queue, setQueue] = useState("");
    let restaurant;
    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {

        const jwt = localStorage.getItem("token");
        if (jwt) {
            fetch("http://localhost:8090/api/restaurant/queue/user/" + user.user.jti)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert("Something went wrong while fetching.");
                    }
                })
                .then(jsonData => {
                    setQueue(jsonData);
                    const ready = JSON.stringify(jsonData);
                    console.log(ready.split(",")[6]);
                    if (ready.split(",")[6] == '"ready":true}]') {
                        nav("/foodready")
                    }
                }
                )
                .catch(rejection => () => errorHandler(rejection));
        }
        console.log(restaurantId);

    }, [restaurantId])


    function getRestaurant() {
        // another fetch here for RESTAURANT
        fetch("http://localhost:8090/api/restaurants/" + restaurantId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => {
                restaurant = jsonData
                console.log(restaurant)
            }
            )
            .catch(rejection => () => errorHandler(rejection));
    }


    function getQueue() {

        fetch("http://localhost:8090/api/restaurant/queue/current/" + restaurant.restaurantId, {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => console.log(jsonData))
            .catch(rejection => () => errorHandler(rejection));
    }






    return (
        <><h3> Hello! Please Get Ready! Your food at  will be ready soon! </h3> <br />

            <p> kindly hold, your food is not yet ready</p></>
    )
}

export default ShowingQueues