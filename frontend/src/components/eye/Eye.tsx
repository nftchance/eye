import { useParams } from 'react-router-dom';

import { useBlinks, useEye } from '../../hooks';

import "./Eye.css";

const Eye = () => {
    const { eyeId } = useParams<{ eyeId: string }>();

    const { 
        client,
        connected,
        eyes
    } = useEye(eyeId);

    const eye = eyes?.find(eye => eye.id === eyeId);

    // const {
    //     blinks,
    //     error
    // } = useBlinks({ eyeId });

    return (
        <>
            <h1>Eye</h1>

            {eye && <div className="eye">
                <h2>{eye.name}</h2>
            </div>}

            {/* {blinks && <div className="blinks">{blinks.map(blink => (
                <Blink
                    key={blink.id}
                    blink={blink}
                />
            ))}</div>} */}
        </>
    )
}

export default Eye;