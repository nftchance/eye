import { useEffect, useState } from 'react';

const useCountdown = (initial: string) => {
    const [secondsUntil, setSecondsUntil] = useState(0);

    const initialDate = new Date(initial);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const seconds = Math.ceil((initialDate.getTime() - now.getTime()) / 1000);
            setSecondsUntil(seconds > 0 ? seconds : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [initial]);

    return { secondsUntil };
}

export { useCountdown }