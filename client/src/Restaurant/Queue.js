import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Customer from '../Customer/Customer';

function Queue(props) {
    const { queueId, customerId } = props.queueObj;
    let customer = {};

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        fetch("http://localhost:8090/api/customers/" + customerId, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => customer = jsonData)
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });

    }, []);


    return (
        <>
            {/* if ur a restaurant owner */}
            <div className="queue-card">
                <p><b>Customer Id:</b> {customerId}</p>
                <p><b>Name:</b> {customer.name}</p>
                <p><b>Phone #:</b> { customer.phoneNum}</p>
                <p><b>Email:</b> {customer.email }</p>
                <p><b>Create Time:</b> { }</p>
                <Link to={'/deleteQueue/' + queueId}><button>Food is Ready!</button></Link>
                <Link to={'/editQueue/' + queueId}><button>Take Customer Off Queue</button></Link>
            </div>
        </>
    )

}

export default Queue;