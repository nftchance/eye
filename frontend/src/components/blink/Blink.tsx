import { Blink as BlinkType } from "../../types";

import { useCountdown } from "../../hooks";

import "./Blink.css";

const Blink = ({
    blink
}: {
    blink: BlinkType
}) => {
    const { secondsUntil } = useCountdown(blink.scheduled)

    return (
        <>
            <a href={blink.url} target="_blank" rel="noreferrer">
                <div
                    key={blink.id}
                    className="blink"
                >
                    <p>
                        <div className={`status-indicator ${blink.status}`}></div>
                        {blink.url}
                    </p>
                    <p>Every: {blink.frequency} secs.</p>
                    <p>In: {secondsUntil} secs.</p>
                </div>
            </a>
        </>
    )
}

export default Blink;