import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteCustomer(){

    const jwt = localStorage.getItem("token");
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState(null);
    const {id} = useParams();

    useEffect(() => {

        console.log(jwt);

        if(jwt){

        let api_url = process.env.REACT_APP_API_URL;

        fetch( api_url + "api/restaurants/" + id, {
            headers: {
                Authorization: "Bearer " + jwt,
            }
        }).then(
            response => {
                if(response.status === 200){
                    return response.json();
                } else {
                    alert("Restaurant couldn't be found");
                    console.log(response);
                }
            }
        ).then (
            a => {
                setRestaurant(a)
            }
        ).catch(
            rejection => {
                alert("This is bad. Couldn't connect to the api.")
                console.log(rejection);
            }
        )
    } else {
        navigate("/Home");
    }
}, []);

    function handleDelete(e){
        e.preventDefault();

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurants/" + id, {
            
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + jwt
            }
        }).then(
            response => {
                if(response.ok){
                    alert("Success, deleted restaurant");
                    navigate("/Home");
                } else {
                    console.log(response);
                    alert("Failed deletion")
                }
            }
        ).catch(
            rejection => alert(rejection)
        );
    }
    
    function handleCancel() {
        navigate("/");
    }

    return(
        <div className="with-margins">
            <span>Are you sure you want to delete {restaurant?.name}</span><br />
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
        );

}

export default DeleteCustomer;