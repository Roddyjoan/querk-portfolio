import { Link } from 'react-router-dom';

function Restaurant(props) {
    const { restaurantId, name, address, est } = props.restaurantObj;

    return (
        <><div className="restaurant-card">
            <div className="map">
                <p> this shuld be the map</p>
            </div>
            <p><b>Name:</b> {name}</p>
            <p><b>Address:</b> {address}.</p>
            <p><b>Estimated Wait Time:</b> {est}</p>
            <Link to={'/menu/' + restaurantId}><button>Menu</button></Link>
            <Link to={'/restaurant/queue/current/' + restaurantId}><button>Join Queue</button></Link>

        </div>

        </>
    )

}

export default Restaurant;