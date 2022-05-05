import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "./Item";

function Items(props) {
    const [items, setItems] = useState([]);
    const {id} = useParams();
    const nav = useNavigate();

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }

    useEffect(() => {
        console.log(id);
        fetch("http://localhost:8090/api/menu/restaurant/" + id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching.");
                nav("/");
            }
        })
        .then(jsonData => setItems(jsonData))
        .catch(rejection => {
            alert("Failure: " + rejection.status + ": " + rejection.statusText)
            nav("/");
        });
        
        }, []);

    function itemFactory() {
        return items.map(itemObj => (
            <Item 
                key={itemObj.itemId} 
                itemObj={itemObj} 
                items={items}
                setItems={setItems}
            />
        ))
    }

    return (
        <>
            <h2>Menu</h2>
            <br />
            {itemFactory()}
        </>
    )
}

export default Items;