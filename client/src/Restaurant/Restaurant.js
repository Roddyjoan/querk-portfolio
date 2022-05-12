import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import JoinQueue from './JoinQueue';

function Restaurant(props) {
    const { restaurantId, name, address, timeEstimate } = props.restaurantObj;
    const [inQueue, setInQueue] = useState([]);
    const [user, setUser] = useContext(AuthContext);
    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    const navigate = useNavigate();


    useEffect(() => {

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurant/queue/current/" + restaurantId, {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                   // alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => setInQueue(jsonData))
            .catch(rejection => () => errorHandler(rejection));
    }, []);

    function joinQueue() {
        const jwt = localStorage.getItem("token");
        

        if (jwt) {
            const toAddToQueue = {
                userId: user.user.jti,
                restaurantId: restaurantId,
                orderedAhead: false,
                expired: false
            }
            console.log(user.user.jti);

            let api_url = process.env.REACT_APP_API_URL;

            fetch(api_url + "api/restaurant/queue", {


                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                body: JSON.stringify(toAddToQueue)
            }).then(response => {
                if (response.status === 201) {
                    alert("Successfully added you to queue!");
                    console.log(response);
                    return response.json();
                } else {
                    alert("Could not add you to the Queue");
                    console.log(response);
                }
            }).then(data => setInQueue([...inQueue, data]))
                .catch(
                    rejection => console.log("Failure! ", rejection)
                );
        } else {
            alert("you must be logged in to add yourself to queue");
            navigate("/login")
        }
    }

    return (
        <><div className="restaurant-card">
            <div className="map">
                <p>Current Number of people in queue: {inQueue.length}</p>
            </div>
            <p><b>Name:</b> {name}</p>
            <p><b>Address:</b> {address}.</p>
            <p><b>Estimated Wait Time:</b> {inQueue.length ? timeEstimate * inQueue.length : timeEstimate} minutes </p>
            <Link to={'/menu/' + restaurantId}><button>Menu</button></Link>
            <button onClick={joinQueue}>Join Queue</button>
            
            
            
            {user?.user ? (user.user.authorities === "ROLE_OWNER" ?
                (
                    <Link to={'/restaurant/queue/current/' + restaurantId}><button> View Queue</button></Link>
                ):(
                    <></>
            )) : ""}
            

        </div>

        </>
    )

}

export default Restaurant;