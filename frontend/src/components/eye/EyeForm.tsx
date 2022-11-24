import { useContext, useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { EyesContext } from '../contexts/EyesContext';

import { Eye, Field } from "../../types";

const EyeForm = ({ eye = undefined }: { eye: Eye | undefined }) => {
    const navigate = useNavigate();

    const { send } = useContext(EyesContext);

    const [fields, setFields] = useState<Field[]>([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        const newFields = fields.map((field) => {
            if (field.name === name) {
                return { ...field, value };
            }

            return field;
        });

        setFields(newFields);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let valid = true;

        fields.forEach((field) => {
            if (field.required === true && field.value === "") {
                setFields((prevFields) => {
                    return prevFields.map((prevField) => {
                        if (prevField.name === field.name) {
                            return { ...prevField, error: "This field is required" };
                        }

                        return prevField;
                    });
                });

                valid = false;
            }
        });

        if (!valid) {
            return;
        }

        // Actually submit the create request now with the websocket client from the EyesContext
        // and then redirect to the page of the newly created eye
        const requestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // Send the request that will create the eye in the database and handle the response callback
        // to redirect to the page of the newly created eye

        // store two variables as the request and then both of them as separate args for send
        let request = {
            message: JSON.stringify({
                action: "create",
                data: {
                    name: fields[0].value,
                    description: fields[1].value
                },
                request_id: requestId
            }),
            callback: handleSubmitResponse
        }

        if (eye !== undefined) {
            request = {
                message: JSON.stringify({
                    action: "update",
                    data: {
                        name: fields[0].value,
                        description: fields[1].value
                    },
                    request_id: requestId,
                    pk: eye.id
                }),
                callback: handleSubmitResponse
            }
        }

        await send(request.message, request.callback);
    };

    const handleSubmitResponse = (
        response: any
    ) => {
        const data = JSON.parse(response.data).data;

        // TODO: Handle errors

        if(eye === undefined) navigate(`/eye/${data.id}`);
    };

    useEffect(() => {
        const initialFields = eye === undefined ? [
            { name: "name", label: "Name", type: "text", value: "", required: true, error: null },
            { name: "description", label: "Description", type: "text", value: "", required: false, error: null },
        ] : [
            { name: "name", label: "Name", type: "text", value: eye.name, required: true, error: null },
            { name: "description", label: "Description", type: "text", value: eye.description, required: false, error: null },
        ];

        setFields(initialFields);
    }, [eye]);

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                    />

                    {field.error && <p>{field.error}</p>}
                </div>
            ))}

            <button type="submit">Create</button>
        </form>
    )
}

export default EyeForm