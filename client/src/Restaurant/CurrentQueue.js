import { React, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Queue from "./Queue";
import AuthContext from "../AuthContext";

function CurrentQueue() {
    const [queues, setQueues] = useState([]);
    const [user, setUser] = useContext(AuthContext);

    const { id } = useParams();

    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    function fetchQueues() {

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/restaurant/queue/current/" + id, {
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
                key={queueObj.entryId} 
                queueObj={queueObj}
                userId= {queues.userId} 
                queues={queues}
                setQueues={setQueues}
                id = {id}
            />
        ))
    }

    function customerStatus(){

    }

    return (
        <div className="with-margins">
            {user.user.authorities === "ROLE_OWNER" ?
                (
                    queueFactory()
                ):(
                    <></>
            )}
        </div>
    )
}

export default CurrentQueue;