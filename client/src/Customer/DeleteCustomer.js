import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteCustomer(){

    const jwt = localStorage.getItem("token");
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const {id} = useParams();

    useEffect(() => {

        console.log(jwt);

        if(jwt){

        fetch("http://localhost:8090/api/customer/" + id, {
            headers: {
                Authorization: "Bearer " + jwt,
            }
        }).then(
            response => {
                if(response.status === 200){
                    return response.json();
                } else {
                    alert("Customer couldn't be found");
                    console.log(response);
                }
            }
        ).then (
            matchingCustomer => {
                setCustomer(matchingCustomer)
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

        fetch("http://localhost:8090/api/customer/" + id, {
            
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + jwt
            }
        }).then(
            response => {
                if(response.status === 204){
                    alert("Success, deleted customer");
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
            <span>Are you sure you want to delete {customer?.name}</span><br />
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
        );

}

export default DeleteCustomer;