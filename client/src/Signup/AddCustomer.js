import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddCustomer() {

    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");

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

    function postUser() {
        const newUser = {
            username: email,
            password: password,
            roles: ["CUSTOMER"]
        };

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/user/customer", {


            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (response.status === 201) {
                alert("Successfully added user");
                return response.json();
            } else {
                alert("Could not add user.");
                console.log(response);
            }
        }).then(data => {
            console.log(data)
            setUserId(data.appUserId)
        }).catch(
            rejection => console.log("Failure! ", rejection)
        );
    } 

    function postCustomer() {

        let newCustomer = {
            name: name,
            userId: userId,
            phoneNum: phoneNum,
            email: email
        };

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( newCustomer )
        }).then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                alert("Could not add customer.");
                console.log(userId);
                console.log(response);
            }
        }).then(data => {
            console.log("data:", data);
            alert("Successfully added you as a user! Please check your email for a confirmation, then log in.");
            navigate("/login");
        })
            .catch(
                rejection => console.log("Failure! ", rejection)
            );
    }

    function handleSubmit(e) {
        e.preventDefault();
        postUser();
    }

    useEffect(() => {
        if (userId !== "") {
            postCustomer();
        }
    }, [userId]);

    return (
        <>
            <div className="with-margins">
                <h2>Customer Sign Up</h2><br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label><br />
                    <input onChange={handleName} id="name"></input><br /><br />

                    <label htmlFor="phone#">Phone Number:</label><br />
                    <input onChange={handlePhone} id="phone#"></input><br /><br />

                    <label htmlFor="email">Email(will be your username):</label><br />
                    <input onChange={handleEmail} id="email"></input><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input onChange={handlePassword} id="password" type="password"></input><br /><br />

                    <button type="submit">Submit</button>
                    <Link to={'/'}><button>Cancel</button></Link>
                </form>
            </div>
        </>
    )
}

export default AddCustomer;