import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddRestaurant() {

    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    
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

    function handleSubmit(e){
        e.preventDefault();

        const newRestaurant= {
            name: name,
            phone: phoneNum,
            email: email
        };

        fetch("http://localhost:8090/api/restaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newRestaurant)
        }).then(response => {
            if (response.ok) {
                alert("Successfully added restaurant.");
                navigate("/home");
            } else {
                alert("Could not add restaurant.");
                console.log(response);
            } 
        }).catch(
            rejection => console.log("Failure! ", rejection)
        );
    }

    return(
        <>
            <div>
            <h2>Restaurant Sign Up</h2><br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input onChange={handleName} id="name"></input><br /><br />

                <label htmlFor="phone#">Address (Street number and name, City, State, Zip Code):</label><br />
                <input onChange={handlePhone} id="phone#"></input><br /><br />

                <label htmlFor="email">Wait Time (Estimated time for a customer to advance in the queue):</label><br />
                <p></p>
                <input onChange={handleEmail} id="email"></input><br /><br />

                <label htmlFor="email">Password:</label><br />
                <input onChange={handleEmail} id="email"></input><br /><br />

                <button type="submit">Sign Up</button>
                <Link to={'/Home'}><button>Cancel</button></Link>
            </form>
            </div>
        </>
    )
}

export default AddRestaurant;