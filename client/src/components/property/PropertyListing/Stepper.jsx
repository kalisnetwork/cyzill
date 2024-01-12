import React from 'react';
import { FaCheckCircle, FaUserCircle, FaKey, FaRegListAlt, FaRegCheckCircle } from 'react-icons/fa';

const steps = [
    { name: 'Personal Info', icon: <FaUserCircle /> },
    { name: 'Account Info', icon: <FaKey /> },
    { name: 'Review', icon: <FaRegListAlt /> },
    { name: 'Confirmation', icon: <FaRegCheckCircle /> },
];

const Stepper = ({ currentStep }) => {
    return (
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {steps.map((step, index) => (
                <li key={index} className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                        {currentStep > index ? <FaCheckCircle /> : step.icon}
                    </span>
                    <h3 className="font-medium leading-tight">{step.name}</h3>
                    <p className="text-sm">Step details here</p>
                </li>
            ))}
        </ol>
    );
};

export default Stepper;
