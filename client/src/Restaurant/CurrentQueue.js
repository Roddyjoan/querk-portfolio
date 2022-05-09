import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Queue from "./Queue";


function CurrentQueue() {
    const [queues, setQueues] = useState([]);
    const { id } = useParams();

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

        fetch("http://localhost:8090/api/restaurant/queue/current/" + id, {
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching.");
            }
        })
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
        <div className="with-margins">
            {queueFactory()}
        </div>
    )
}

export default CurrentQueue;