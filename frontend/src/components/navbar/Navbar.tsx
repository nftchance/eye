import { Link } from 'react-router-dom';

import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="">Eye</Link>

            <div className="links">
                <Link to="eye">
                    <button>
                        Enter App
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;