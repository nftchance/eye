import { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { EyesContext } from '../contexts/EyesContext';

import EyeForm from './EyeForm';

import "./Eye.css";

const Eye = () => {
    const { eyes } = useContext(EyesContext);

    const { eyeId } = useParams<{ eyeId: string }>();

    const eye = eyes?.find(eye => eye.id === eyeId);

    return (
        <>
            <h1>Eye</h1>

            {eye && <>
                <div className="eye">
                    <h2>{eye.name}</h2>
                    {eye.description ?? <p>{eye.description}</p>}
                </div>

                <EyeForm eye={eye} />

                <h2>Blinks ({eye.blinks.length})</h2>

                {eye.blinks.map((blink, index) => <div key={index}>
                    <p>Test</p>
                    <p>{blink.url}</p>
                    <p>{blink.frequency}</p>
                </div>)}
            </>}
        </>
    )
}

export default Eye;