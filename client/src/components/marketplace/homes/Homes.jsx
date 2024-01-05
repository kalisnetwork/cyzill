import React, { useEffect, useState } from "react";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import Map from '../map/Map';
import Filters from '../filters/Filters';

const Homes = () => {
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [visibleProperties, setVisibleProperties] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        searchTerm: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: '',
        amenities: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://cyzill-api.onrender.com/api/property/properties');
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

    useEffect(() => {
        const filteredProperties = propertyData.filter(property => {
            // Add your filter logic here. For example:
            return (!filters.price || property.price <= filters.price) &&
                (!filters.bedrooms || property.bedrooms >= filters.bedrooms) &&
                (!filters.bathrooms || property.bathrooms >= filters.bathrooms) &&
                (!filters.propertyType || property.propertyType === filters.propertyType) &&
                (!filters.amenities.length || filters.amenities.every(amenity => property.amenities.includes(amenity))) &&
                property.location.address.toLowerCase().includes(filters.searchTerm.toLowerCase());
        });
        setVisibleProperties(filteredProperties);
    }, [filters, propertyData]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    const handleSearch = (term) => {
        setFilters(prevFilters => ({ ...prevFilters, searchTerm: term }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex items-center justify-start p-2 border border-gray-200">
                <Filters onSearch={handleSearch} onFilterChange={handleFilterChange} />
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
