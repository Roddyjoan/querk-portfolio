import Customer from "./Customer/Customer"
import Restaurant from "./Restaurant/Restaurant"
import EditCustomers from "./Customer/EditCustomer"
import EditRestaurant from "./Restaurant/EditRestaurant"
import Customers from "./Customer/Customers"
import { useContext } from "react"
import AuthContext from "./AuthContext"

function AccountSettings() {

   const [user, setUser] = useContext(AuthContext);
   const [restaurants, setRestaurants] = useState([]);

   
    useEffect(() => {

        fetch("http://localhost:8090/api/restaurants/", {
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching.");
                }
            })
            .then(jsonData => setRestaurants(jsonData))
            .catch(rejection => {
                alert("Failure: " + rejection.status + ": " + rejection.statusText)
            });

    }, []);
   

    function findUsersRestaurant(){
        return restaurants.filter(res => res.userId === user.userId);
    }

    return (
        <div>
            {user.authorities === "ROLE_OWNER" ? <Restaurant restaurantObj = {findUsersRestaurant()[0]}/> : <Customer />}
        </div>
    )
}

export default AccountSettings;