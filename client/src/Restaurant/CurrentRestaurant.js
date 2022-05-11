import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

function CurrentRestaurant(props) {
    const { restaurantId, name, address, timeEstimate } = props.restaurantObj;
    const [user, setUser] = useContext(AuthContext);

    return (
        <div className="restaurant-card">
            <p><b>Name:</b> {name}</p>
            <p><b>Address:</b> {address}</p>
            <p><b>Estimated Wait Time:</b> {timeEstimate} minutes </p>
            <Link to={'/editRestaurant/' + user.user.jti}><button>Edit Restaurant Information</button></Link>
            <Link to={'./deleteRestaurant/' + user.user.jti}>Delete Restaurant</Link>
        </div>
    )
}

export default CurrentRestaurant;