import { useParams } from 'react-router-dom';

import { useBlinks } from '../../hooks';

import Blink from '../blink/Blink';

import "./Eye.css";

const Eye = () => {
    const { eyeId } = useParams<{ eyeId: string }>();

    const {
        blinks,
        error
    } = useBlinks({ eyeId });

    return (
        <>
            {blinks && <div className="blinks">{blinks.map(blink => (
                <Blink
                    key={blink.id}
                    blink={blink}
                />
            ))}</div>}
        </>
    )
}

export default Eye;