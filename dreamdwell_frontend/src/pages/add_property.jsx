import React, { useState } from 'react';

function Add_property() {
    const [mediaFiles, setMediaFiles] = useState([]);

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        setMediaFiles(files);
    };

    const getMediaPreview = (file) => {
        const url = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
            return <img src={url} alt="preview" className="w-full h-32 object-cover rounded-md" />;
        } else if (file.type.startsWith('video/')) {
            return (
                <video controls className="w-full h-32 rounded-md">
                    <source src={url} type={file.type} />
                    Your browser does not support the video tag.
                </video>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-6 flex items-center justify-center">
            <div className="bg-white w-full max-w-5xl p-10 rounded-2xl shadow-xl">
                <h2 className="text-4xl font-bold text-[#002B5B] mb-8 text-left">Add New Property</h2>

                <form className="space-y-8 text-left">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            placeholder="Property title"
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Location</label>
                        <input
                            type="text"
                            placeholder="Property location"
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price and Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Price Per Month</label>
                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Type</label>
                            <select className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="flat">Villa</option>
                                <option value="room">Cabin</option>
                            </select>
                        </div>
                    </div>

                    {/* Guests, Bedrooms, Bathrooms */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Guests</label>
                            <input
                                type="number"
                                placeholder="Guests"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Bedrooms</label>
                            <input
                                type="number"
                                placeholder="Bedrooms"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Bathrooms</label>
                            <input
                                type="number"
                                placeholder="Bathrooms"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Media Upload */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Upload Images/Videos (Optional)</label>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleMediaChange}
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 bg-white"
                        />
                        {mediaFiles.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {mediaFiles.map((file, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                                        {getMediaPreview(file)}
                                        <p className="text-xs px-2 py-1 truncate">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-[#002B5B] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add_property;
