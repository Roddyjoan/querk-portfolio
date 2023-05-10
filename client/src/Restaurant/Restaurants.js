import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Restaurant from "./Restaurant";

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState('');
    const filteredRestaurants = restaurants.filter(
      (restaurant) => restaurant.name.toLowerCase().includes(search.toLowerCase()));

    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {

        let api_url = process.env.REACT_APP_API_URL;
        fetch(api_url + "api/restaurants/", {
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

    const restaurantFactory = () => {
        return filteredRestaurants.map(restaurantObj => (
            <Restaurant
                key={restaurantObj.restaurantId}
                restaurantObj={restaurantObj}
                restaurants={filteredRestaurants}
                setRestaurants={setRestaurants}
            />
        ))
    }

    return (
        <div className="with-margins">
          <input
            type='text'
            placeholder='Search restaurants by name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
            <h2>Restaurants</h2>
            <br />
            {restaurantFactory()}
        </div>
    )
}

export default Restaurants;