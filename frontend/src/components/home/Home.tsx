import { Link } from "react-router-dom";

import EyeForm from "../Eye/EyeForm";

const Home = () => {

    return (
        <>
            <h1>Blink</h1>
            <p>A simpler way to achieve higher uptime rates.</p>

            <EyeForm />
        </>
    )
}

export default Home