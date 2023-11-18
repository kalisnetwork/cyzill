import React from 'react';
import { useForm } from 'react-hook-form';

const PropertyListingForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Save form data
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="font-medium">Personal Details</label>
                <select
                    {...register("personalDetails", { required: true })}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                    <option value="Owner">Owner</option>
                    <option value="Agent">Agent</option>
                </select>
                {errors.personalDetails && <span>This field is required</span>}
            </div>
            {/* Add other form fields in a similar way */}
            <div>
                <label className="font-medium">Photos</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("photos")}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>
        </form>
    );
};

export default PropertyListingForm;
