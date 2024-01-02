import React, { useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRegUser } from 'react-icons/fa';
import { Modal, ModalProvider } from '../../../context/Modal.js';
import ImageGallery from './ImageGallery';

const PropertyDetails = ({ property }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [showGallery, setShowGallery] = useState(false);

    const handleImageClick = (index) => {
        setActiveImage(index);
        setShowGallery(true);
    };

    const handleCloseGallery = () => {
        setShowGallery(false);
    };

    return (
        <ModalProvider>
            {property ? (
                <div className="h-full bg-white p-4">
                    <div className="property-details-modal flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto">
                            <div className="property-card-details flex gap-2 cursor-pointer">
                                <div className="w-1/2 relative h-[310px]">
                                    <img
                                        className="h-full w-full object-cover cursor-pointer"
                                        src={property.photos[activeImage]}
                                        alt={`Property ${property._id}`}
                                        onClick={() => handleImageClick(activeImage)}
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                                </div>
                                <div className="w-1/2 grid grid-cols-2 gap-2">
                                    {property.photos.slice(1, 5).map((image, index) => (
                                        <div key={index} onClick={() => handleImageClick(index + 1)} className="relative">
                                            <img
                                                className="h-[150px] w-full object-cover cursor-pointer"
                                                src={image}
                                                alt={`Property ${property._id}`}
                                            />
                                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="property-info p-4">
                                <div className="listing-details">
                                    <div className="price-details">
                                        <h2 className="price text-2xl font-semibold">₹{property.price}</h2>
                                    </div>
                                </div>
                                <div className="property-features mt-4">
                                    <div className="features-list">
                                        <div className="flex items-center">
                                            <FaBed className="mr-2" />
                                            <span>{property.bedrooms} Bedrooms</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaBath className="mr-2" />
                                            <span>{property.bathrooms} Bathrooms</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaRulerCombined className="mr-2" />
                                            <span>{property.coveredArea} sqft</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="location-details mt-4">
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="mr-2" />
                                        <span>{property.location.address}</span>
                                    </div>
                                </div>
                                <div className="agent-details mt-4">
                                    <div className="flex items-center">
                                        <FaRegUser className="mr-2" />
                                        <span>{property.username}</span>
                                    </div>
                                </div>
                                <div className="other-details mt-4">
                                    <div>Construction Year: {property.constructionYear}</div>
                                    <div>Furnished Status: {property.furnishedStatus}</div>
                                    <div>Amenities: {property.amenities}</div>
                                    <div>Price Includes: {property.priceIncludes}</div>
                                    <div>Maintenance Charges: {property.maintenanceCharges}</div>
                                    <div>Description about the place : {property.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showGallery && (
                        <Modal onClose={handleCloseGallery}>
                            <ImageGallery
                                images={property.photos}
                                activeImage={activeImage}
                                setActiveImage={setActiveImage}
                                setShowGallery={setShowGallery}
                            />
                        </Modal>
                    )}
                </div>
            ) : null}
        </ModalProvider>
    );
};

export default PropertyDetails;
