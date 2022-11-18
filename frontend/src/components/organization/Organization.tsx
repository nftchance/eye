import { useParams } from 'react-router-dom';

import { useBlinks } from '../../hooks';

const Organization = () => {
    const { organizationId } = useParams<{ organizationId: string }>();

    const {
        blinks,
        error
    } = useBlinks({organizationId});

    console.log(blinks, error);

    return (
        <>
            <h1>Organization</h1>
            <h2>{organizationId}</h2>

            {blinks && blinks.map(blink => (
                <p key={blink.id}>{blink.url}</p>
            ))}
        </>
    )
}

export default Organization;