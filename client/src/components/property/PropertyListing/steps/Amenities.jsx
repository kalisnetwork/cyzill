import React, { useState, useEffect } from 'react';

const Amenities = ({ formData, saveFormData }) => {
    const initialAmenities = formData.amenities || [];
    const [amenities, setAmenities] = useState(initialAmenities);
    const [selectedAmenities, setSelectedAmenities] = useState({
        parking: initialAmenities.includes('Parking'),
        gym: initialAmenities.includes('Gym'),
        pool: initialAmenities.includes('Pool'),
        wifi: initialAmenities.includes('Wifi'),
        security: initialAmenities.includes('Security'),
        lift: initialAmenities.includes('Lift'),
        powerBackup: initialAmenities.includes('Power Backup'),
    });

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);
    const handleAmenitiesChange = (e) => {
        const amenity = e.target.value;
        const isChecked = e.target.checked;

        setSelectedAmenities(prevState => ({ ...prevState, [amenity.toLowerCase()]: isChecked }));

        if (isChecked) {
            if (!amenities.includes(amenity)) {
                setAmenities([...amenities, amenity]);
                saveFormData({ ...formData, amenities: [...amenities, amenity] });
            }
        } else {
            const newAmenities = amenities.filter(a => a !== amenity);
            setAmenities(newAmenities);
            saveFormData({ ...formData, amenities: newAmenities });
        }
    };
    const handleSave = async () => {
        try {
            // Call the API to save the data in MongoDB
            const response = await fetch('http://localhost:5000/api/property/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error saving property data');
            }

            const data = await response.json();
            console.log('Property data saved successfully:', data);
        } catch (error) {
            console.error(error.message);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the API to save the data in MongoDB
            const response = await fetch('http://localhost:5000/api/property/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error saving property data');
            }

            const data = await response.json();
            console.log('Property data saved successfully:', data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="amenities" className="block mb-1 font-medium">Amenities:</label>
                    <div className="space-y-2">
                        <div>
                            <input type="checkbox" id="parking" name="amenities" value="Parking" checked={selectedAmenities.parking} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="parking"> Parking</label>
                        </div>
                        <div>
                            <input type="checkbox" id="gym" name="amenities" value="Gym" checked={selectedAmenities.gym} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="gym"> Gym</label>
                        </div>
                        <div>
                            <input type="checkbox" id="pool" name="amenities" value="Pool" checked={selectedAmenities.pool} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="pool"> Pool</label>
                        </div>
                        <div>
                            <input type="checkbox" id="wifi" name="amenities" value="Wifi" checked={selectedAmenities.wifi} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="wifi"> Wifi</label>
                        </div>
                        <div>
                            <input type="checkbox" id="security" name="amenities" value="Security" checked={selectedAmenities.security} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="security"> Security</label>
                        </div>
                        <div>
                            <input type="checkbox" id="lift" name="amenities" value="Lift" checked={selectedAmenities.lift} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="lift"> Lift</label>
                        </div>
                        <div>
                            <input type="checkbox" id="powerBackup" name="amenities" value="Power Backup" checked={selectedAmenities.powerBackup} onChange={handleAmenitiesChange} className="mr-2" />
                            <label htmlFor="powerBackup"> Power Backup</label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <input type="submit" value="Submit" className="w-full border rounded-md px-3 py-2" />
                    <input type="button" value="Save" onClick={handleSave} className="w-full border rounded-md px-3 py-2 ml-4" />
                </div>
            </form>
        </div>
    )
}

export default Amenities;
