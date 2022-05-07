import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Queue from "./Queue";


function CurrentQueue() {
    const [queues, setQueues] = useState([]);
    const { restaurantId } = useParams();

    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    // useEffect(() => {
    //     const token = localStorage.getItem( "token" );
    //     if(token){
    //         fetchQueues();
    //     } else {
    //         nav("/login");
    //     }
    // },[]);

    function fetchQueues() {

        const jwt = localStorage.getItem("token");

        fetch("http://localhost:8090/api/restaurant/queue/current/" + restaurantId, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        .then(response => response.json())
        .then(jsonData => setQueues(jsonData))
        .catch(rejection => () => errorHandler(rejection));
    }

    function queueFactory() {
        fetchQueues();

        return queues.map(queueObj => (
            <Queue 
                key={queueObj.queueId} 
                queueObj={queueObj} 
                queues={queues}
                setQueues={setQueues}
            />
        ))
    }

    return (
        <>
            {queueFactory()}
        </>
    )
}

export default CurrentQueue;