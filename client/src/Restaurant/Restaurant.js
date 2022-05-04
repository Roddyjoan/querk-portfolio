import { Link } from 'react-router-dom';

function Restaurant(props) {
    const {restaurantId, name, address, est} = props.restaurantObj;

    return (
        <div className="restaurant-card">
            <p><b>Name:</b> {name}</p>
            <p><b>address</b> {address}.</p>
            <p><b>Estimated Wait Time:</b> {est}</p>
            <Link to={'/delete/' + restaurantId}><button>Delete Restaurant</button></Link>
            <Link to={'/edit/' + restaurantId}><button>Edit Restaurant Information</button></Link>
        </div>
    )

}

export default Restaurant;