import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Restaurant(props) {
    const { restaurantId, name, address, timeEstimate } = props.restaurantObj;
    const [inQueue,SetInQueue] = useState([]);
    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {

        fetch("http://localhost:8090/api/restaurant/queue/current/" + restaurantId, {
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching.");
            }
        })
        .then(jsonData => SetInQueue(jsonData))
        .catch(rejection => () => errorHandler(rejection));
    }, []);

    return (
        <><div className="restaurant-card">
            <div className="map">
                <p>Current Number of people in queue: {inQueue.length}</p>
            </div>
            <p><b>Name:</b> {name}</p>
            <p><b>Address:</b> {address}.</p>
            <p><b>Estimated Wait Time:</b> {timeEstimate * inQueue.length} minutes </p>
            <Link to={'/menu/' + restaurantId}><button>Menu</button></Link>
            <Link to={'/restaurant/queue/current/' + restaurantId}><button>Join Queue</button></Link>

        </div>

        </>
    )

}

export default Restaurant;