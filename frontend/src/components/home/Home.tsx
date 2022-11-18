import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Blink</h1>
            <p>A simpler way to achieve higher uptime rates.</p>

            <Link to="organization/blink">Blink</Link>
            <Link to="organization/cosanostra">Cosanostra</Link>
            <Link to="organization/badger">Badger</Link>
        </>
    )
}

export default Home