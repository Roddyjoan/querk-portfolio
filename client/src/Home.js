import graphic from './graphic.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import Modal from './Modal';
import ShowingQueues from './ShowingQueue';
import Hero from './CustomComponents/Hero';

function Home() {

    const [user, setUser] = useContext(AuthContext);
    const [show, setShow] = useState(false);
    let customer;

    function errorHandler(rejectionMessage) {
        console.log(rejectionMessage);
    }


    return (
        <>
            {user?.user ? (
                <div className='homepage'>
                    <img src={'./ramen.jpg'} className="img-fluid" />
                    <div className="burrito-text">Welcome Back {user.user.sub}! 
                        <ShowingQueues />
                    </div>
                       

                    <Modal />

                    <br /><br /><br />
                </div>
            ) : (
                <>
                   {/* <Hero
                    title="Create your iQueue profile"
                    subtitle="as a Restaurant Owner or Customer"
                    buttonOneText="Restaurant Owner"
                    buttonOneLink="/signup/owner"
                    buttonTwoText="Customer"
                    buttonTwoLink="/signup/customer"
                    imageSrc="./burrito.jpg"
                    /> */}
                    <img src={'./burrito.jpg'} className="homepage" />
                    <div className="burrito-text w-screen h-screen text-white">Get started today!

                        <br /><br />
                        Create your iQueue profile
                        <br />
                        as a Restaurant Owner or Customer
                        <br /><br />
                        <Link to="/signup/owner"><button className="burrito-button">Restaurant</button></Link>&nbsp;&nbsp;&nbsp;
                        <Link to="/signup/customer"><button className="burrito-button">Customer</button></Link>
                    </div>
                    <img src={graphic} className="img-centered" />
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