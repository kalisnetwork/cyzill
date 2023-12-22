import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import { Pannellum } from 'pannellum-react';
import { app } from '../../../../firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useSelector } from 'react-redux';

const Media = ({ saveFormData }) => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [panorama, setPanorama] = useState();

    const { currentUser } = useSelector(state => state.user)
    const username = currentUser?.others?.username || currentUser?.username
    console.log(username);

    console.log('Current User:', currentUser);
    useEffect(() => {
        saveFormData({ media: images });
    }, [images]);
    useEffect(() => {
        saveFormData({ media: videos });
    }, [videos]);
    useEffect(() => {
        saveFormData({ media: [panorama] });
    }, [panorama]);
    const onDrop = useCallback(async (acceptedFiles) => {
        const storage = getStorage(app);
        const urlPromises = acceptedFiles.map(async (file) => {
            const filePath = `users/${username}/media/${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            return getDownloadURL(storageRef);
        });

        try {
            const urls = await Promise.all(urlPromises);
            saveFormData({ media: [...images, ...urls] });
            setImages((prevImages) => [...prevImages, ...urls]);
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    }, [images]);



    const onDropVideo = useCallback((acceptedFiles) => {
        setVideos((prevVideos) => [...prevVideos, ...acceptedFiles]);
    }, []);

    const onDropPanorama = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        setPanorama(url);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const { getRootProps: getRootPropsPanorama, getInputProps: getInputPropsPanorama, isDragActive: isDragActivePanorama } = useDropzone({ onDrop: onDropPanorama });

    const removeImage = (index) => {
        const url = images[index];
        const storage = getStorage(app);
        // Create a reference to the file to delete
        const imageRef = ref(storage, `gs://gauth-estate.appspot.com/users/${username}/media/${url}`);
        // Delete the file
        deleteObject(imageRef).then(() => {
            console.log('File deleted successfully');
            // Remove the image URL from the images state
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
            saveFormData({ media: newImages });
        }).catch((error) => {
            console.error('Error deleting image:', error.message);
        });
    };


    const removePanorama = () => {
        setPanorama(null);
    };

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload your files</h2>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block mb-1 font-medium">Upload Images</label>
                    <div {...getRootProps()} className="">
                        <input {...getInputProps()} />
                        {isDragActive ?
                            <p className=''>Drop the files here ...</p> :
                            <div>
                                <p className='text-md text-gray-500'>PNG, JPG, JPEG up to 20MB</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="w-1/2 pl-2 border border-gray-400 overflow-auto" style={{ maxHeight: '300px' }}>
                    {/* Display uploaded images */}
                    {images.map((url, index) => (
                        <div key={index} className="mb-2 relative">
                            <img src={url} alt={`Image ${index}`} className="w-full h-32 object-cover" />
                            <AiOutlineClose className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600 " onClick={() => removeImage(index)} />
                        </div>
                    ))}

                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block mb-1 font-medium">Upload 360-degree Panorama</label>
                    <div {...getRootPropsPanorama()} className="">
                        <input {...getInputPropsPanorama()} />
                        {isDragActivePanorama ?
                            <p className=''>Drop the files here ...</p> :
                            <div>

                                <p className='text-md text-gray-500'>PNG, JPG, JPEG up to 20MB</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="w-1/2 pl-2 border border-gray-400 relative">
                    {panorama && (
                        <>
                            <Pannellum
                                width="100%"
                                height="300px"
                                image={panorama}
                                pitch={10}
                                yaw={180}
                                hfov={110}
                                autoLoad
                            />
                            <AiOutlineClose className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600 " onClick={removePanorama} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Media;
