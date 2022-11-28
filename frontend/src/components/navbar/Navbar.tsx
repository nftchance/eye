import { Link } from 'react-router-dom';

import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <Link to="">Eye</Link>
                <Link to="">About</Link>
                <Link to="">Pricing</Link>
                <Link to="">Network</Link>
            </div>


            <div className="links">
                <Link to="eye">Log in</Link>

                <Link to="eye">
                    <button>
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;