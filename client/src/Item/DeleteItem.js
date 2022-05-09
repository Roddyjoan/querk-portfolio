import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function DeleteItem(props) {

    const Navigate = useNavigate();

    function handleDelete() {
        var confirm = window.confirm("Are you sure you want to delete?")
        if (confirm) {
            fetch("http://localhost:8080/api/menu/" + props.itemId, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response => {
                    if (response.status === 204) {
                        console.log ( response )
                        alert("Item Successfully deleted!");
                        console.log(props.agentId);
                        props.removeFromState(props.agentId);
                        Navigate("/menu")
                        // removeFromState();
                    }
                    
                    else {
                        alert("how are you even seeing this X???")
                    }
                })
        } else {
            alert("Unable to delete");
        }
    }

    return <button id="put-right" className="btn btn-danger" onClick={handleDelete}>X</button>
}

export default DeleteItem;