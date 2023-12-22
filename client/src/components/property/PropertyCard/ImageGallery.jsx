import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ImageGallery = ({ images, activeImage, setActiveImage, setShowGallery }) => {
    const handleImageClick = (index) => {
        setActiveImage(index);
    };

    const handleCloseGallery = () => {
        setShowGallery(false);
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center">
            <div className="bg-white p-2 rounded-lg h-full w-full max-w-4xl flex flex-col">
                <div className="flex justify-end">
                    <AiOutlineClose className="cursor-pointer text-white bg-red-600 " onClick={handleCloseGallery} />
                </div>
                <div className="flex justify-center items-center flex-1">
                    <img className="w-full h-96 object-cover" src={images[activeImage]} alt={`Image ${activeImage + 1}`} />
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {images.map((image, index) => (
                        <div key={index} onClick={() => handleImageClick(index)} className={`col-span-2 md:col-span-${index % 2 === 0 ? '2' : '1'}`}>
                            <img className={`w-full h-16 md:h-32 object-cover cursor-pointer ${index === activeImage ? 'border-2 border-blue-500' : ''}`} src={image} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
