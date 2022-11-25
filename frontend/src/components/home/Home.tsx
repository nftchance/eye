import { useContext } from 'react';

import { EyesContext } from '../../contexts';

import { useEyeFields } from '../../hooks';

import Form from '../form/Form';

const Home = () => {
    const { send } = useContext(EyesContext);

    const eyeFields = useEyeFields();

    return (
        <>
            <h1>Blink</h1>
            <p>A simpler way to achieve higher uptime rates.</p>

            <Form 
                initialFields={eyeFields}
                send={send}
                redirect={`/eye/`}
            />
        </>
    )
}

export default Home