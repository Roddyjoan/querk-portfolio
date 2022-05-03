import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function DeleteCustomer(){

    const jwt = localStorage.getItem("token");
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const {customerId} = useParams();

    useEffect(() => {

        console.log(jwt);

        if(jwt){

        fetch("http://localhost:8090/api/customer/" + customerId, {
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

        fetch("http://localhost:8090/api/customer/" + agentId, {
            
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + jwt
            }
        }).then(
            response => {
                if(response.status === 204){
                    alert("Success, deleted agent");
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
        navigate("/home");
    }

    return(
        <>
            <span>Are you sure you want to delete {customer?.name}</span><br />
            <button onClick={handleDelete}>*DELETE CUSTOMER*</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
        );

}

export default DeleteCustomer;