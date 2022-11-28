import { useContext } from 'react';

import { BlinksContext, EyesContext } from '../../contexts';

import { useEyeFields } from '../../hooks';

import Form from '../form/Form';

import "./Home.css";

const Home = () => {
    const { send } = useContext(EyesContext);

    const { blinks } = useContext(BlinksContext);

    const systemEye = "49413bce-f6e1-46ee-bc58-460168235402";

    const systemBlinks = blinks?.filter(blink => blink.eye === systemEye);

    const eyeFields = useEyeFields().filter(field => field.name === "name");

    return (
        <>
            <div className="hero">
                <div className="hero__content">
                    <svg width="5871.329" height="672.808" viewBox="0 0 5871.329 672.808">
                        <g transform="translate(891.135 -689.081)">
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-891.135 838.063)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-888.094 835.022)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-885.054 831.981)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-882.013 828.941)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-878.973 825.9)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-875.932 822.86)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-872.891 819.819)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-869.851 816.779)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-866.81 813.738)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-863.77 810.697)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-860.729 807.657)" />
                            <path d="M0,235.612H795.3l67.114-94.139,75.2,147.268,43.867-106.534h40.734V523.744l106.534-639.207,94,404.2,53.267-106.534,18.8,53.4h4543.1" transform="translate(-857.729 804.657)" />
                        </g>
                    </svg>

                    <h1>Minimize downtime.<br />Decrease response time.<br />Increase resolution speed.</h1>
                    <p className="lead">Access all the benefits of status oracles for every internet service you're running without writing any code.</p>

                    <div className="hero__content__statuses">
                        {systemBlinks?.map(blink => (
                            <div className="hero__content__statuses__status">
                                <h5>{blink.url}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Form
                initialFields={eyeFields}
                send={send}
                redirect={`/eye/`}
                buttonText={"Create eye"}
            />
        </>
    )
}

export default Home;