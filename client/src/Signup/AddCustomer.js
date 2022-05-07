import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddCustomer() {

    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleName(e) {
        setName(e.target.value);
    }

    function handlePhone(e) {
        setPhoneNum(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }


    let appUserIdForAdd;

    function postUser() {
        const newUser = {
            username: email,
            password: password,
            roles: ["CUSTOMER"]
        };

        fetch("http://localhost:8090/api/user/customer", {


            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (response.ok) {
                alert("Successfully added user");
                return response.json();
            } else {
                alert("Could not add user. Make sure that the password has at least one special letter and one number.");
                console.log(response);
            }
        }).then(data => {
            console.log(data.appUserId);
            appUserIdForAdd = data.appUserId;
            postCustomer();
        })
            .catch(
                rejection => console.log("Failure! ", rejection)
            );
    }

    function postCustomer() {
        const newCustomer = {
            name: name,
            userId: appUserIdForAdd,
            phoneNum: phoneNum,
            email: email
        };
        fetch("http://localhost:8090/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newCustomer })
        }).then(response => {
            console.log(newCustomer);
            if (response.status == 400 ) {
                alert("Successfully added you as a user!Please check your email for a confirmation, then log in.");
                navigate("/login");
                return response.json();
            } else {
                alert("Could not add customer.");
                console.log(appUserIdForAdd);
                console.log(response);
            }
        }).catch(
            rejection => console.log("Failure! ", rejection)
        );
    }

    

    function handleSubmit(e) {
        e.preventDefault();
        postUser();
    }

    return (
        <>
            <div>
                <h2>Customer Sign Up</h2><br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label><br />
                    <input onChange={handleName} id="name"></input><br /><br />

                    <label htmlFor="phone#">Phone Number:</label><br />
                    <input onChange={handlePhone} id="phone#"></input><br /><br />

                    <label htmlFor="email">Email:</label><br />
                    <input onChange={handleEmail} id="email"></input><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input onChange={handlePassword} id="password" type="password"></input><br /><br />

                    <button type="submit">Submit</button>
                    <Link to={'/Home'}><button>Cancel</button></Link>
                </form>
            </div>
        </>
    )
}

export default AddCustomer;