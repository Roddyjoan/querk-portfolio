import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer(){

    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        const token = localStorage.getItem("token");

        if (token) {
            fetch("http://localhost:8090/api/customers/" + id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")

                }
            }).then(
                response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        alert("Something went wrong! " + response)
                        console.log(response);
                    }
                }).then(
                    a => {
                        setCustomer(a)
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
        const customerCopy = { ...customer };
        customerCopy.name = event.target.value;
        setCustomer(customerCopy);
    }

    function handlePhoneNumChange(event) {
        const customerCopy = { ...customer };
        customerCopy.phoneNum = event.target.value;
        setCustomer(customerCopy);
    }

    function handleEmailChange(event) {
        const customerCopy = { ...customer };
        customerCopy.email = event.target.value;
        setCustomer(customerCopy);
    }

    function handleEdit(e) {
        e.preventDefault();

        fetch("http://localhost:8090/api/customers/" + customer.customerId, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        }).then(
            response => response.ok ? navigate("/customers") : alert("Something went wrong! " + response)
        ).catch(
            rejection => alert(rejection)
        );
    }

    function handleCancel() {
        navigate("/");
    }

    return customer ?
        <form onSubmit={handleEdit} className="with-margins">
            <label htmlFor="name">Name: </label><br />
            <input onChange={handleNameChange} value={customer?.name} id="name"></input><br /><br />
            <label htmlFor="phoneNum">Phone Number:</label><br />
            <input onChange={handlePhoneNumChange} value={customer?.phoneNum} id="phoneNum"></input><br /><br />
            <label htmlFor="email">Email:</label><br />
            <input onChange={handleEmailChange} value={customer?.email} id="email"></input><br /><br />

            <button>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        : <></>
    ;
}

export default EditCustomer;