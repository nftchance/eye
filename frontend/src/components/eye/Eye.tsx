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

            {eye && <div className="eye">
                <h2>{eye.name}</h2>
                <p>{eye.description}</p>
            </div>}

            <EyeForm eye={eye} />
        </>
    )
}

export default Eye;