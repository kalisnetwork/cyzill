import React, { useState, useEffect } from 'react';

const useInput = (initialValue, key, formData, saveFormData) => {
    const [value, setValue] = useState(formData?.[key] !== undefined ? formData[key] : initialValue);
    useEffect(() => {
        setValue(formData?.[key] !== undefined ? formData[key] : initialValue);
    }, [formData]);
    const handleChange = (e) => {
        if (e && e.target) {
            const newValue = e.target.value;
            setValue(newValue);
            if (saveFormData) {
                saveFormData({ ...formData, [key]: newValue });
            }
        }
    };
    return [value, handleChange];
};



const Description = ({ formData, saveFormData }) => {
    const [description, setDescriptionChange] = useInput('Default description', 'description', formData, saveFormData);
    const [personalDetails, handlePersonalDetailsChange] = useInput('', 'personalDetails', formData, saveFormData);
    const [forDetails, handleForDetailsChange] = useInput('', 'forDetails', formData, saveFormData);
    const [warning, setWarning] = useState('');
    const maxDescriptionLength = 1000;

    const handleDescriptionChange = (e) => {
        if (e && e.target) {
            const inputText = e.target.value;
            const hasFiveDigits = /\d{5}/.test(inputText);
            if (hasFiveDigits) {
                setWarning('*Please do not include any phone numbers or personal information in the description.');
            } else if (inputText.length <= maxDescriptionLength) {
                setDescriptionChange(inputText);
                if (saveFormData) {
                    saveFormData({ ...formData, description: inputText });
                }
                setWarning('');
            }
        }
    };

    return (
        <>
            <div className="w-full mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="mx-auto p-10 grid grid-cols-2 gap-6">
                    <div>
                        <form action="/submit_description" className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">I am</label>
                                <select value={personalDetails} onChange={handlePersonalDetailsChange} className="w-full border rounded-md px-3 py-2" >
                                    <option value=""></option>
                                    <option value="owner">Owner</option>
                                    <option value="agent">Agent</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">For Sell / Rent</label>
                                <select value={forDetails} onChange={handleForDetailsChange} className="w-full border rounded-md px-3 py-2" >
                                    <option value=""></option>
                                    <option value="sell">Sell</option>
                                    <option value="rent">Rent</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="w-full border rounded-md px-3 py-2 resize-none border-gray-300"
                                    placeholder="Enter description about the property (max 1000 words)"
                                    rows="7"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {description.length}/{maxDescriptionLength}
                                </p>
                                {warning && <p className="text-xs text-red-500 mt-1">{warning}</p>}
                            </div>
                        </form>
                    </div>
                    <div className="bg-gray-100 p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Property Details</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;