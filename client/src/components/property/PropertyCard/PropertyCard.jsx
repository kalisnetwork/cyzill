// PropertyCard.js
import React, { useState, useEffect } from 'react';
import { ModalProvider, Modal } from '../../../context/Modal'
import './PropertyCard.css';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaRegUser } from 'react-icons/fa';
import PropertyDetails from './PropertyDetails';

const PropertyCard = () => {
    const [propertyData, setPropertyData] = useState(null);
    const [activeImage, setActiveImage] = useState({});
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                setPropertyData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        console.log(selectedProperty);
        fetchData();
    }, [selectedProperty]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const handleImageClick = (propertyId, imageIndex) => {
        setSelectedProperty(propertyData.find(property => property.id === propertyId));
        setSelectedImageIndex(imageIndex);
    };

    const handleToggleClick = (propertyId, direction) => {
        const currentIndex = activeImage[propertyId] || 0;
        let newIndex = currentIndex + direction;
        if (newIndex < 0) {
            newIndex = propertyData.find(property => property.id === propertyId).images.length - 1;
        } else if (newIndex >= propertyData.find(property => property.id === propertyId).images.length) {
            newIndex = 0;
        }
        setActiveImage({ ...activeImage, [propertyId]: newIndex });
    };

    const handleCardClick = (e, property) => {
        if (e.target.closest('.toggler-icon')) {
            // Clicked on toggle, handle toggle click
            handleToggleClick(property.id, e.target.classList.contains('left') ? -1 : 1);
        } else {
            // Clicked outside toggles, handle card click
            setSelectedProperty(property); // Set selectedProperty to null to show the white screen
            setShowModal(true);
            console.log(selectedProperty);
        }
    };



    return (
        <ModalProvider>
            <div className="property-cards">
                {propertyData &&
                    propertyData.map((property) => (
                        <div className="property-card" key={property.id} onClick={(e) => handleCardClick(e, property)}>
                            <div className="property-info">
                                <div className="property-image">
                                    <img
                                        src={property.images[activeImage[property.id] || 0]}
                                        alt={`Property ${property.id}`}
                                    />
                                    <div className="toggler-icon left" onClick={() => handleToggleClick(property.id, -1)}>
                                        <FaChevronLeft />
                                    </div>
                                    <div className="image-toggler">
                                        {property.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`image-toggle ${activeImage[property.id] === index ? 'active' : ''}`}
                                                onClick={() => handleImageClick(property.id, index)}
                                            />
                                        ))}
                                    </div>
                                    <div className="toggler-icon right" onClick={() => handleToggleClick(property.id, 1)}>
                                        <FaChevronRight />
                                    </div>
                                </div>
                                <div className="posted-on-overlay">{property.postedOn}</div>
                                <div className="property-details">
                                    <div className="listing-details">
                                        <div className="price-details">
                                            <h2 className="price">
                                                ₹{property.price}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="property-features">
                                        <div className="features-list">
                                            <div className="feature">
                                                <div className="icon">
                                                    <FaBed />
                                                </div>
                                                {property.bedrooms}&emsp;/
                                            </div>
                                            <div className="features-list">
                                                <div className="icon">
                                                    <FaBath />
                                                </div>
                                                {property.bathrooms}&emsp;/
                                            </div>
                                            <div className="features-list">
                                                <div className="icon">
                                                    <FaRulerCombined />
                                                </div>
                                                {property.sqfoot} sqft
                                            </div>
                                        </div>
                                    </div>
                                    <div className="location-details">
                                        <div className="location-icon">
                                            <FaMapMarkerAlt />
                                        </div>
                                        {truncateText(property.location, 30)}
                                    </div>
                                    <div className="agent-details">
                                        <div>
                                            <FaRegUser />
                                        </div>
                                        <div className="agent-name">{property.agent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PropertyDetails property={selectedProperty} />
                </Modal>
            )}

        </ModalProvider>
    );
};

export default PropertyCard;
