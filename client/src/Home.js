import graphic from './graphic.png';
import burrito from './burrito-filter.jpg';
import ramen from './ramen.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

function Home() {

    const [user, setUser] = useContext(AuthContext);

    return (
        <>
                {user?.user ? (
                    <div>
                        <img src={ramen} />
                        <div className="burrito-text">Welcome Back</div>
                        <br /><br /><br />
                    </div>
                ) : (
                    <>
                        <img src={burrito} />
                        <div className="burrito-text">Get started today!
                            <br /><br />
                            Create your iQueue profile
                            <br />
                            as a Restaurant Owner or Customer
                            <br /><br />
                            <Link to="/restaurantform"><button className="burrito-button">Restaurant</button></Link>&nbsp;&nbsp;&nbsp;
                            <Link to="/customerform"><button className="burrito-button">Customer</button></Link>
                        </div>
                        <img src={graphic} />
                        <div>
                            <br />
                            <h3>Imagine you’re out at night with your friends and you just want to get some food.
                                But after you choose a restaurant, you have to wait for a table, wait to make your order, then wait for your food before you can eat.
                            </h3>
                            <br />
                            <h3>
                                It’s 2022, why are you still waiting so long?
                            </h3>
                            <br />
                            <h3>
                                We designed iQueue, an app where you can pick a restaurant, put your party on the queue, and order your food all before you even arrive at the restaurant. When it’s almost your turn, you’ll be notified and the restaurant will begin preparing your food. That way, your food and table will be ready and waiting for you!
                            </h3>
                            <br /><br /><br />
                        </div>
                    </>
                )}
        </>
    )
}

export default Home;