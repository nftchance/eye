import { useState } from "react";

import { useEye } from '../../hooks/useEye'

interface Field { 
    name: string;
    label: string;
    type: string;
    value: string;
    error: string | null;
}

const EyeForm = () => {
    const { handleCreate } = useEye();

    const initialFields = [
        { name: "name", label: "Name", type: "text", value: "", error: null },
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        // submit the form
        console.log("submit the form");

        // reset the form
        setFields(initialFields);
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