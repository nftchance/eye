import { Link } from 'react-router-dom';

import { useEye } from '.././../hooks';

const Eyes = () => {
    const { 
        client, 
        connected,
        eyes 
    } = useEye(undefined); // load without a specific eye

    return (
        <>
            <h1>Eyes</h1>

            {eyes && <div className="eyes">{eyes.map(eye => (
                <div key={eye.id}>
                    <Link to={`/eye/${eye.id}`}>
                        <h2>{eye.name}</h2>
                    </Link>
                </div>
            ))}</div>}
        </>
    )
}

export default Eyes;