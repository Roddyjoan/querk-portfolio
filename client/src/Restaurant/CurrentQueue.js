import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Queue from "./Restaurant/Queue";


function CurrentQueue() {
    const [queues, setQueues] = useState([]);

    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {
        const token = localStorage.getItem( "token" );
        if(token){
            fetchQueues();
        } else {
            nav("/login");
        }
    },[]);

    function fetchQueues() {

        const jwt = localStorage.getItem("token");

        fetch("http://localhost:8090/api/queues/", {
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