import { userSetter } from 'core-js/fn/symbol';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Customer from '../Customer/Customer';

function ViewQueue(props) {
    const { queueId, customerId, queues, setQueues, id , userId, entryId} = props.queueObj;
    const [ name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
   
    


    useEffect(() => {
        const jwt = localStorage.getItem("token");
        fetch("http://localhost:8090/api/customers/" + userId, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => {
                console.log(jsonData);
                setName(jsonData.name);
                setPhoneNum(jsonData.phoneNum);
                setEmail(jsonData.email);
                console.log(name, phoneNum, email);
                
            })
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });

    }, [])

    function makeExpired(e){
       
        const jwt = localStorage.getItem("token");
        let toUpdate = {
            entryId:1,
            userId: userId,
            restaurantId: props.id
        };
        e.preventDefault();
        fetch("http://localhost:8090/api/restaurant/queue/update/" + userId, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toUpdate)
        })
            .then(response => {
                if (response.status === 204) {
                    console.log(response)
                    console.log("this means it went through")
                    return response.json();

                } else {
                    console.log(props.id)
                    alert("Something went wrong while fetching.");
                }
            })
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });

        
    }

    function signalFoodReady(e){
        e.preventDefault();
        console.log("food is ready")

    }
    

    
    return (
            <div className="queue-card">
                <p><b>Customer's User Id:</b> {userId}</p>
                <p><b>Name:</b> {name}</p>
                <p><b>Phone #:</b> {phoneNum}</p>
                <p><b>Email:</b> {email}</p>
                <p><b>Create Time:</b> {props.queueObj.createTime} {props.queueObj.createTime > "12:00:00" ? "PM" : "AM"} </p>
                <button onClick={signalFoodReady}>Food is Ready!</button>
                <button onClick={makeExpired}>Take Customer Off Queue</button>
            </div>
    )

}

export default ViewQueue;