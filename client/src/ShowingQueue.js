import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";



function ShowingQueues() {
    const [user, setUser] = useContext(AuthContext);
    const [restaurantId, setRestaurantId] = useState("");
    const [queue, setQueue] = useState([]);
    let restaurant;
    const [index, setIndex] = useState(0)
    let custId;
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
                        console.log(user.user.jti)
                        return response.json();
                    } else {
                        alert("Something went wrong while fetching.");
                    }
                })
                .then(jsonData => {
                    restaurant = jsonData[0].restaurantId;
                    custId = jsonData[0].userId;
                    getQueue();
                    if (jsonData[0].ready) {

                        nav("/foodready")
                    }
                }
                )
                .catch(rejection => () => errorHandler(rejection));
        }
        console.log(restaurant);

    }, [queue])


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

        fetch("http://localhost:8090/api/restaurant/queue/current/" + restaurant, {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => 
                {
                    setQueue(jsonData);
                    let num = queue.findIndex(Object =>{
                        return Object.userId == user.user.jti;
                    });
                    setIndex(num);
                    console.log(num);
                    
                })
            .catch(rejection => () => errorHandler(rejection));
    }


    function getPlaceInLine(){
        console.log(queue);
        console.log("hekp")
    }
    


    return (

        user.user.authorities === "ROLE_CUSTOMER" ? 
        ( queue.length ? 
            (<> <br /> <h3> Hello! Please Get Ready! Your food will be ready soon! 
                    <br />Your place in line: {index + 1}
            </h3> <br />
            
            <p> Food is not yet ready! </p></>) : ""
    ) : ""
    )
}

export default ShowingQueues;