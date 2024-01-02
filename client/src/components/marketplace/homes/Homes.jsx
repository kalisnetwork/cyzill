import React, { useEffect, useState } from "react";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import Map from '../map/Map';
import Filters from '../filters/Filters';

const Homes = () => {
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [visibleProperties, setVisibleProperties] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true); // add isLoading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/property/properties');
                const data = await response.json();
                console.log('propertyData:', data);
                setPropertyData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredProperties = propertyData.filter(property => property.location.address.toLowerCase().includes(searchTerm.toLowerCase()));

    if (isLoading) {
        return <div>Loading...</div>; // display loading indicator
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex items-center justify-start p-2 border border-gray-200">
                <Filters onSearch={handleSearch} />
            </div>
            <div className="flex-grow overflow-auto">
                <div className="flex flex-row h-full overflow-auto">
                    <div className="w-1/2 h-full overflow-auto">
                        <Map setSelectedProperties={setSelectedProperties} setVisibleProperties={setVisibleProperties} />
                    </div>
                    <div className="w-1/2 h-full overflow-auto p-2">
                        <div className="py-4">
                            <p className="text-lg font-semibold text-gray-700">Real Estate & Homes For Sale</p>
                        </div>
                        {visibleProperties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Homes;
