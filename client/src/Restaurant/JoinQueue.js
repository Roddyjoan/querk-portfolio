import { useParams } from "react-router-dom";

function JoinQueue(){

    
    const { id } = useParams();

    return <p>this should let you join this queue {id} </p>
}

export default JoinQueue;