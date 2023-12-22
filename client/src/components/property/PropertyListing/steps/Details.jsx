import React, { useEffect, useState } from 'react';

const Details = ({ formData, saveFormData }) => {
    const [bedrooms, setBedrooms] = useState(formData.bedrooms || '');
    const [bathrooms, setBathrooms] = useState(formData.bathrooms || '');
    const [coveredArea, setCoveredArea] = useState(formData.coveredArea || '');
    const [carpetArea, setCarpetArea] = useState(formData.carpetArea || '');
    const [constructionYear, setConstructionYear] = useState(formData.constructionYear || '');

    useEffect(() => {
        setBedrooms(formData.bedrooms || '');
        setBathrooms(formData.bathrooms || '');
        setCoveredArea(formData.coveredArea || '');
        setCarpetArea(formData.carpetArea || '');
        setConstructionYear(formData.constructionYear || '');
    }, [formData]);

    const handleBedroomsChange = (e) => {
        saveFormData({ ...formData, bedrooms: e.target.value });
    };

    const handleBathroomsChange = (e) => {
        saveFormData({ ...formData, bathrooms: e.target.value });
    };

    const handleCoveredAreaChange = (e) => {
        saveFormData({ ...formData, coveredArea: e.target.value });
    };

    const handleCarpetAreaChange = (e) => {
        saveFormData({ ...formData, carpetArea: e.target.value });
    };

    const handleConstructionYearChange = (e) => {
        saveFormData({ ...formData, constructionYear: e.target.value });
    };

    return (
        <div className="mx-auto p-10 grid grid-cols-2 gap-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Bedrooms</label>
                    <input
                        type="number"
                        value={formData.bedrooms || ''}
                        onChange={handleBedroomsChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter number of bedrooms"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Bathrooms</label>
                    <input
                        type="number"
                        value={formData.bathrooms || ''}
                        onChange={handleBathroomsChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter number of bathrooms"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Covered Area (Sq.Ft)</label>
                    <input
                        type="number"
                        value={formData.coveredArea || ''}
                        onChange={handleCoveredAreaChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter covered area"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Carpet Area (Sq.Ft)</label>
                    <input
                        type="number"
                        value={formData.carpetArea || ''}
                        onChange={handleCarpetAreaChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter carpet area"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Year of Construction</label>
                    <input
                        type="number"
                        value={formData.constructionYear || ''}
                        onChange={handleConstructionYearChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter construction year"
                    />
                </div>
            </div>
            <div className="bg-gray-100 p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">Property Details</h3>
                <p>Bedrooms: {bedrooms}</p>
                <p>Bathrooms: {bathrooms}</p>
                <p>Covered Area: {coveredArea}</p>
                <p>Carpet Area: {carpetArea}</p>
                <p>Construction Year: {constructionYear}</p>
            </div>
        </div>
    );
};

export default Details;
