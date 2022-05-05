import { Link } from 'react-router-dom';

function Restaurant(props) {
    const {restaurantId, name, address, est} = props.restaurantObj;

    return (
        <div className="restaurant-card">
            <p><b>Name:</b> {name}</p>
            <p><b>Address:</b> {address}.</p>
            <p><b>Estimated Wait Time:</b> {est}</p>
            <Link to={'/menu'} props={restaurantId}><button>Menu</button></Link>
            <Link to={'/joinqueue' + restaurantId}><button>Join Queue</button></Link>
        </div>
    )

}

export default Restaurant;