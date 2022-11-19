import { Blink as BlinkType } from "../../types";

import "./Blink.css";

const Blink = ({
    blink
}: {
    blink: BlinkType
}) => {
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
                    <p>{blink.frequency} seconds</p>
                    <p>Scheduled: {blink.scheduled}</p>
                </div>
            </a>
        </>
    )
}

export default Blink;