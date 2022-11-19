import { useParams } from 'react-router-dom';

import { useBlinks } from '../../hooks';

const Organization = () => {
    const { organizationId } = useParams<{ organizationId: string }>();

    const {
        blinks,
        error
    } = useBlinks({ organizationId });

    return (
        <>
            <h1>{organizationId}</h1>

            {blinks && blinks.map(blink => (
                <div key={blink.id}>
                    <hr />
                    <p>Id: {blink.id}</p>
                    <p>URL: {blink.url}</p>
                    <p>Scheduled: {blink.scheduled}</p>
                    <p>Frequency: {blink.frequency}</p>
                    <p>Updated: {blink.updated}</p>
                    <p>Created: {blink.created}</p>
                    <p>Status: {blink.status}</p>
                </div>
            ))}
        </>
    )
}

export default Organization;