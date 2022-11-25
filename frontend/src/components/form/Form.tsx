import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Blink, Eye, Field } from "../../types";

const Form = ({
    obj,
    send,
    initialFields,
    redirect
}: {
    obj?: Eye | Blink,
    send: any,
    initialFields: Field[],
    redirect?: string
}) => {
    const navigate = useNavigate();

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

        // Actually submit the create request now with the websocket client from the EyesContext
        // and then redirect to the page of the newly created eye
        const requestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const data = fields.map((field) => {
            return { [field.name]: field.value };
        }).reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});

        const constants = {
            data: data,
            request_id: requestId
        }

        let request = JSON.stringify({
            action: "create",
            ...constants
        })

        if (obj !== undefined) {
            request = JSON.stringify({
                action: "update",
                pk: obj.id,
                ...constants
            })
        }

        await send(
            request,
            handleSubmitResponse
        );
    };

    const handleSubmitResponse = (
        message: any
    ) => {
        const response = JSON.parse(message.data);

        console.log(response?.errors)

        // If there are errors reflect them in the form
        if (response.errors?.length !== 0) {
            setFields((prevFields) => {
                return prevFields.map((prevField) => {
                    if (response.errors[0][prevField.name] !== undefined) {
                        return { ...prevField, error: response.errors[0][prevField.name] };
                    }

                    return { ...prevField, error: "" };
                });
            });

            return;
        }

        setFields(initialFields);

        if (redirect && obj === undefined) navigate(`${redirect}${response.data.id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div
                    key={field.name}
                    className="input-group"
                    style={{
                        marginBottom: field.hidden ? "0" : ".5rem",
                    }}
                >
                    {!field.hidden && <label
                        htmlFor={field.name}
                    >
                        {field.label}
                    </label>}

                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={field.value as any}
                        hidden={field.hidden}
                        onChange={handleChange}
                        className={field.error ? "has-error" : ""}
                    />

                    {field.error && <p className="error">{field.error}</p>}
                </div>
            ))}

            <button type="submit">Save</button>
        </form>
    )
}

export default Form