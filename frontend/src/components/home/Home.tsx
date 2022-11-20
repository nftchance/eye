import { useEye } from '../../hooks/useEye'

import EyeForm from "../eye/EyeForm";

const Home = () => {

    const { client } = useEye();

    return (
        <>
            <h1>Blink</h1>
            <p>A simpler way to achieve higher uptime rates.</p>

            <EyeForm />
        </>
    )
}

export default Home