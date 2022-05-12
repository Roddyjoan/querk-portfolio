import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRestaurant(){

    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        const token = localStorage.getItem("token");

        if (token) {

            let api_url = process.env.REACT_APP_API_URL;

            fetch(api_url + "api/restaurants/" + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")

                }
            }).then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert("Something went wrong! " + response)
                        console.log(response);
                    }
                }).then(
                    a => {
                        setRestaurant(a)
                    }
                ).catch(
                    rejection => {
                        alert("could not connnect to api");
                        console.log(rejection);
                    }

                );
        } else {
            navigate("/Home");
        }
    }, [])

    function handleNameChange(event) {
        const restaurantCopy = { ...restaurant };
        restaurantCopy.name = event.target.value;
        setRestaurant(restaurantCopy);
    }

    function handleAddressChange(event) {
        const restaurantCopy = { ...restaurant };
        restaurantCopy.address = event.target.value;
        setRestaurant(restaurantCopy);
    }

    function handleEstChange(event) {
        const restaurantCopy = { ...restaurant };
        restaurantCopy.est = event.target.value;
        setRestaurant(restaurantCopy);
    }

    function handleEdit(e) {
        e.preventDefault();

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurants/" + restaurant.restaurantId, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(restaurant)
        }).then(
            response => response.ok ? navigate("/restaurants") : alert("Something went wrong! " + response)
        ).catch(
            rejection => alert(rejection)
        );
    }

    return restaurant ?
    <form onSubmit={handleEdit} className="with-margins">
        <label htmlFor="name">Name: </label><br />
        <input onChange={handleNameChange} value={restaurant?.name} id="name"></input><br /><br />
        <label htmlFor="adresss">Address:</label><br />
        <input onChange={handleAddressChange} value={restaurant?.Address} id="address"></input><br /><br />
        <label htmlFor="email">Est:</label><br />
        <input onChange={handleEstChange} value={restaurant?.est} id="est"></input><br /><br />

        <button>Submit</button>
    </form>
    : <></>
    ;

}

export default EditRestaurant;