import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddRestaurant() {

    const [name, setName] = useState("");
    const [timeEstimate, setTimeEstimate] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("")

    const navigate = useNavigate();

    function handleName(e) {
        setName(e.target.value);
    }

    function handleTimeEstimate(e) {
        setTimeEstimate(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleUsername(e){
        setUsername(e.target.value);
    }


    function postUser() {
        const newUser = {
            username: username,
            password: password,
            roles: ["OWNER"]
        };

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/user/restaurant", {


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
            setUserId(data.appUserId);
        })
            .catch(
                rejection => console.log("Failure! ", rejection)
            );
    }



    function postRestaurant() {
        const newRestaurant = {
            name: name,
            userId: userId,
            timeEstimate: timeEstimate,
            address: address
        };

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRestaurant)
        }).then(response => {
            if (response.ok) {
                alert("Successfully added you as a user! Please Login with your new credentials!");
                navigate("/login");
            } else {
                alert("Could not add your account. Something went wrong.");
                console.log(response);
            }
        }).catch(
            rejection => console.log("Failure! ", rejection)
        );
    }
    

    useEffect(() => {
        if (userId !== "") {
            postRestaurant();
        }
    }, [userId]);

    function handleSubmit(e) {
        e.preventDefault();
        postUser();

    }

    return (
        <>
            <div className="with-margins">
                <h2>Restaurant Sign Up</h2><br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name of Restaurant:</label><br />
                    <input onChange={handleName} id="name"></input><br /><br />

                    <label htmlFor="address">Address (Street number and name, City, State, Zip Code):</label><br />
                    <input onChange={handleAddress} id="address"></input><br /><br />

                    <label htmlFor="timeestimate">Wait Time (Estimated time for a customer to advance in the queue):</label><br />
                    <input onChange={handleTimeEstimate} id="timeestimate"></input><br /><br />

                    <label htmlFor="username">Email (will also be your username):</label><br />
                    <input onChange={handleUsername} id="username"></input><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input onChange={handlePassword} id="password" type="password"></input><br /><br />

                    <button type="submit">Sign Up</button>
                    <Link to={'/'}><button>Cancel</button></Link>
                </form>
            </div>
        </>
    )
}

export default AddRestaurant;