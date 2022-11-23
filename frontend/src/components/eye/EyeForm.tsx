import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { EyesContext } from '../contexts/EyesContext';

interface Field {
    name: string;
    label: string;
    type: string;
    value: string;
    error: string | null;
}

const EyeForm = () => {
    const navigate = useNavigate();

    const { send } = useContext(EyesContext);

    const initialFields = [
        { name: "name", label: "Name", type: "text", value: "", error: null },
        { name: "description", label: "Description", type: "text", value: "", error: null },
    ];

    const [fields, setFields] = useState<Field[]>(initialFields);

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
        console.log(fields);

        // validate the fields
        // if there are errors, set the errors
        // if there are no errors, submit the form
        fields.forEach((field) => {
            if (field.value === "") {
                setFields((prevFields) => {
                    return prevFields.map((prevField) => {
                        if (prevField.name === field.name) {
                            return { ...prevField, error: "This field is required" };
                        }

                        return prevField;
                    });
                });
            }
        });

        // if there are no errors, submit the form
        const hasErrors = fields.some((field) => field.error !== null);
        if (hasErrors) {
            return
        }

        // Actually submit the create request now with the websocket client from the EyesContext
        // and then redirect to the page of the newly created eye
        const requestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        console.log('sending request');

        // Send the request that will create the eye in the database and handle the response callback
        // to redirect to the page of the newly created eye
        await send(
            JSON.stringify({
                action: "create",
                data: {
                    name: fields[0].value,
                    description: fields[1].value
                },
                request_id: requestId
            }), 
            handleSubmitResponse
        );
    };

    const handleSubmitResponse = (
        response: any 
    ) => {
        const data = JSON.parse(response.data).data;

        setFields(initialFields);

        // TODO: Handle errors

        navigate(`/eye/${data.id}`);
    };

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