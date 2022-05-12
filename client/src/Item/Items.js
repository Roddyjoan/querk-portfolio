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
                id={id}
            />
        ))
    }

    return (
        <div className="with-margins">
            <h2>Menu</h2>
            <br />
            {items.length ? 
            (itemFactory()) : (<><h2> Nothing to see here, yet! Please contact this restaurant for updated information!</h2><br /> <p> If you are the restaurant owner, please click account settings to add items to this menu!</p></>  ) }
        </div>
    )
}

export default Items;