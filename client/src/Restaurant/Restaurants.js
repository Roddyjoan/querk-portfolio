import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Agent from "./Agent";

function Agents() {
    const [agents, setAgents] = useState([]);
    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {
        const jwt = localStorage.getItem( "token" );
        if( jwt ){
            fetch("http://localhost:8090/api/agent",{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching.");
            }
        })
        .then(jsonData => setAgents(jsonData))
        .catch(rejection => {
            alert("Failure: " + rejection.status + ": " + rejection.statusText)
        });
        }else {
            nav("/login");
        }
    }, []);

    function agentFactory() {
        return agents.map(agentObj => (
            <Agent 
                key={agentObj.agentId} 
                agentObj={agentObj} 
                agents={agents}
                setAgents={setAgents}
            />
        ))
    }

    return (
        <>
            <h2>All Agents</h2>
            {agentFactory()}
        </>
    )
}

export default Agents;