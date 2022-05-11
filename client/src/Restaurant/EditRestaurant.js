import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRestaurant(){

    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch("http://localhost:8090/api/restaurants/" + id, {
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
        restaurantCopy.timeEstimate = event.target.value;
        setRestaurant(restaurantCopy);
    }

    function handleEdit(e) {
        e.preventDefault();

        fetch("http://localhost:8090/api/restaurants/" + restaurant.restaurantId, {
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

    function handleCancel() {
        navigate("/");
    }

    return restaurant ?
    <form onSubmit={handleEdit} className="with-margins">
        <label htmlFor="name">Name: </label><br />
        <input onChange={handleNameChange} value={restaurant?.name} id="name"></input><br /><br />
        <label htmlFor="adresss">Address:</label><br />
        <input onChange={handleAddressChange} value={restaurant?.address} id="address"></input><br /><br />
        <label htmlFor="est">Estimated time for customer to advance in queue:</label><br />
        <input onChange={handleEstChange} value={restaurant?.timeEstimate} id="est"></input><br /><br />

        <button>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
    </form>
    : <></>
    ;

}

export default EditRestaurant;