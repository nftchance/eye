import { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { BlinksContext, EyesContext } from '../../contexts';

import { useBlinkFields, useEyeFields } from '../../hooks';

import Form from '../form/Form';

import "./Eye.css";

const Eye = () => {
    const { eyes, send: eyesSend } = useContext(EyesContext);
    const { blinks, send: blinksSend } = useContext(BlinksContext);

    const { eyeId } = useParams<{ eyeId: string }>();

    const eye = eyes?.find(eye => eye.id === eyeId);
    const eyeBlinks = blinks?.filter(blink => blink.eye === eyeId);

    const eyeFields = useEyeFields(eye);
    const blinkFields = useBlinkFields(eye);

    return (
        <>
            {eye && <>
                <div className="eye">
                    <h1>{eye.name}</h1>
                    {eye.description ?? <p>{eye.description}</p>}
                </div>
                
                <Form
                    obj={eye}
                    send={eyesSend}
                    initialFields={eyeFields}
                />

                <h2>Blinks ({eyeBlinks.length})</h2>

                <Form
                    send={blinksSend}
                    initialFields={blinkFields}
                />

                {eyeBlinks.map((blink, index) => <div key={index}>
                    <hr/>
                    <p>{blink.url}</p>
                    <p>{blink.frequency}</p>
                    <p>{new Date(blink.scheduled).toLocaleString()}</p>

                    <p>{new Date(blink.created).toLocaleString()}</p>
                    <p>{new Date(blink.updated).toLocaleString()}</p>
                </div>)}
            </>}
        </>
    )
}

export default Eye;