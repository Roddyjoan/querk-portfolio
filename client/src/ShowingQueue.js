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
    let foodready = false;

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {

        const jwt = localStorage.getItem("token");
        if (jwt) {

            let api_url = process.env.REACT_APP_API_URL;
            fetch(api_url + "api/restaurant/queue/user/" + user.user.jti)
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
                        foodready = true;
                    }
                }
                )
                .catch(rejection => () => errorHandler(rejection));
        }
        console.log(restaurant);

    }, [queue])


    function getRestaurant() {
        // another fetch here for RESTAURANT
        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurants/" + restaurantId)
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

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurant/queue/current/" + restaurant, {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => {
                setQueue(jsonData);
                let num = queue.findIndex(Object => {
                    return Object.userId === user.user.jti;
                });
                setIndex(num);
                console.log(num);

            })
            .catch(rejection => () => errorHandler(rejection));
    }


    function getPlaceInLine() {
        console.log(queue);
        console.log("hekp")
    }



    return (


        user.user.authorities === "ROLE_CUSTOMER" ?
            (queue.length ?

                (foodready ? (
                    <><img src={'./ramen.jpg'} className="img-fluid" /><div className="burrito-text">
                        <h1> Your food is ready!You can go pick it up now: D </h1>
                    </div></>
                ) : (
                    <> <br /> <h3> Hello! Please Get Ready! Your food will be ready soon!
                        <br />Your place in line: {index + 1}
                    </h3> <br />

                        <p> Food is not yet ready! </p></>
                )) : "" ) : "")
}

export default ShowingQueues;