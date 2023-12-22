import React, { useEffect, useReducer } from 'react';
import Description from './steps/Description';
import Media from './steps/Media';
import Location from './steps/Location';
import Details from './steps/Details';
import Amenities from './steps/Amenities';

const initialState = {
    step: 1,
    formData: {
        description: '',
        media: [],
        location: '',
        detail: '',
        amenities: [],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'nextStep':
            return { ...state, step: state.step + 1 };
        case 'previousStep':
            return { ...state, step: state.step - 1 };
        case 'saveFormData':
            return { ...state, formData: { ...state.formData, ...action.data } };
        default:
            throw new Error();
    }
}


const PropertyListing = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextStep = () => {
        if (state.step < Object.keys(stepComponents).length) {
            dispatch({ type: 'nextStep' });
        }
    };
    const previousStep = () => dispatch({ type: 'previousStep' });

    const saveFormData = (data) => {
        dispatch({ type: 'saveFormData', data });
        console.log(state.formData);
    };
    useEffect(() => {
        console.log(state.formData);
    }, [state.formData]);


    const stepComponents = {
        1: Description,
        2: Media,
        3: Location,
        4: Details,
        5: Amenities,
    };

    const StepComponent = stepComponents[state.step];

    const stepNames = {
        1: 'Description',
        2: 'Media',
        3: 'Location',
        4: 'Details',
        5: 'Amenities',
    };
    const isStepCompleted = () => {
        switch (state.step) {
            case 1:
                return state.formData.description && state.formData.description.trim() !== '';
            case 2:
                return state.formData.media && state.formData.media.length > 0;
            case 3:
                return state.formData.location.lat !== '' && state.formData.location.lng !== '';
            case 4:
                return state.formData.bedrooms && state.formData.bathrooms && state.formData.coveredArea && state.formData.carpetArea && state.formData.constructionYear;
            case 5:
                return state.formData.amenities && state.formData.amenities.length > 0;
            default:
                return true;
        }
    };


    const isLastStep = state.step === Object.keys(stepComponents).length;

    const totalSteps = Object.keys(stepComponents).length;
    const completionPercentage = Math.floor((state.step / totalSteps) * 100);

    return (
        <div className="p-10 relative">
            <div className="steps">
                <ol className="grid grid-cols-5 text-sm font-medium text-gray-500">
                    {Object.keys(stepComponents).map((index) => (
                        <li
                            key={index}
                            className={`relative flex justify-center ${state.step >= index ? 'text-blue-600' : 'text-gray-500'
                                }`}
                        >
                            <span
                                className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full ${state.step >= index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-600 text-white'
                                    }`}
                            >
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>

                            <span className="hidden sm:block">
                                {stepNames[index]}
                            </span>
                        </li>
                    ))}
                </ol>
                <div className="mt-4 block h-1 w-full rounded-lg bg-gray-200 relative -z-10">
                    <div
                        className="absolute top-0 left-0 h-1 bg-blue-500"
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
                <div />
            </div>
            <StepComponent formData={state.formData} setFormData={saveFormData} saveFormData={saveFormData} />
            <div className="flex justify-between">
                {state.step !== 1 && (
                    <button onClick={previousStep} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
                        Previous
                    </button>
                )}
                {!isLastStep && (
                    <button onClick={nextStep} disabled={!isStepCompleted()} className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isStepCompleted() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;
