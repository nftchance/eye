import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { EyesContext } from '../contexts/EyesContext';

const Eyes = () => {
    const { eyes } = useContext(EyesContext);

    return (
        <>
            <h1>Eyes</h1>

            {eyes &&
                <div className="eyes">
                    {eyes.map(eye => (
                        <div key={eye.id}>
                            <Link to={`/eye/${eye.id}`}>
                                <h2>{eye.name}</h2>
                                <p>{eye.description}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default Eyes;