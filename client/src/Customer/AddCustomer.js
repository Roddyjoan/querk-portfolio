import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddAgent() {

    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    
    const navigate = useNavigate();

    useEffect(
        () => {
            const jwt = localStorage.getItem( "token" );
            if( jwt == null ){
                navigate("/login");
            }
        },
        []
    );

    function handleFirst(e) {
        setFirst(e.target.value);
    }

    function handleMiddle(e) {
        setMiddle(e.target.value);
    }

    function handleLast(e) {
        setLast(e.target.value);
    }

    function handleDOB(e) {
        setBirthdate(e.target.value);
    }

    function handleHeight(e) {
        setHeight(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const newAgent = {
            firstName: first,
            middleName: middle,
            lastName: last,
            dob: birthdate,
            heightInInches: height
        };

        fetch("http://localhost:8090/api/agent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newAgent)
        }).then(response => {
            if (response.ok) {
                alert("Successfully added agent.");
                navigate("/agents");
            } else {
                alert("Could not add agent.");
            } 
        }).catch(
            rejection => console.log("Failure! ", rejection)
        );
    }

    return(
        <>
            <div>
            <h2>Customer Profile</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input onChange={handleFirst} id="firstName"></input><br />

                <label htmlFor="middleName">Middle Initial:</label>
                <input onChange={handleMiddle} id="middleName"></input><br />

                <label htmlFor="lastName">Last Name:</label>
                <input onChange={handleLast} id="lastName"></input><br />

                <label htmlFor="dob">DOB:</label>
                <input onChange={handleDOB} type="date" id="dob"></input><br />

                <label htmlFor="heightInInches">Height (inches):</label>
                <input onChange={handleHeight} id="heightInInches"></input><br /><br />

                <button type="submit">Submit</button>
                <Link to={'/agents'}><button>Cancel</button></Link>
            </form>
            </div>
        </>
    )
}

export default AddAgent;