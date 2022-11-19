import { Link } from "react-router-dom";

import OrganizationForm from "../organization/OrganizationForm";

const Home = () => {

    return (
        <>
            <h1>Blink</h1>
            <p>A simpler way to achieve higher uptime rates.</p>

            <OrganizationForm />
        </>
    )
}

export default Home