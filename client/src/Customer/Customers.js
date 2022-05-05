import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Customer from "./Customer";


function Customers() {
    const [customers, setCustomers] = useState([]);

    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {
        const token = localStorage.getItem( "token" );
        if(token){
            fetchCustomers();
        } else {
            nav("/login");
        }
    },[]);

    function fetchCustomers() {

        const jwt = localStorage.getItem("token");

        fetch("http://localhost:8090/api/customers/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        .then(response => response.json())
        .then(jsonData => setCustomers(jsonData))
        .catch(rejection => () => errorHandler(rejection));
    }

    function customerFactory() {
        return customers.map(customerObj => (
            <Customer 
                key={customerObj.customerId} 
                customerObj={customerObj} 
                customers={customers}
                setCustomers={setCustomers}
            />
        ))
    }

    return (
        <>
            {customerFactory()}
        </>
    )
}

export default Customers;