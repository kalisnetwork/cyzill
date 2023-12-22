import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';

const ListedProperties = () => {
    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <h2 className="text-2xl font-semibold mb-4">Listed Properties</h2>
            {/* Add Property Link */}
            <div className="mb-4 flex justify-end">
                <Link to="/property-listing" className="flex items-center text-blue-500 hover:text-blue-700">
                    <FiPlusCircle className="mr-1" />
                    Add Property
                </Link>
            </div>
            {/* Listed Properties */}
            <div>
                {/* Replace this with your code to display the listed properties */}
                <p>ListedProperties</p>
            </div>
        </div>
    )
}

export default ListedProperties
