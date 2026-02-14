import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from './axiosClient';

const AddData = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset, // Added this to clear the form after success
        formState: { errors },
    } = useForm();

    const onsubmit = async (data) => {
        try {
            setLoading(true);
            setErrorMsg('');
            setSuccessMsg('');
            const response = await axiosClient.post("/addFood", data);
            
            setSuccessMsg(response.data.message || 'Data added successfully 🎉');
            reset(); // Clears the inputs
        } catch (error) {
            setErrorMsg(
                error.response?.data?.message || 'Something went wrong 😢'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
                <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-8">
                    Add New Food Item
                </h1>

                <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
                    {/* Food Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Food Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Spicy Ramen"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition"
                            {...register('name', { required: "Food name is required" })} 
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input 
                            type="number" 
                            step="0.01"
                            placeholder="0.00"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition"
                            {...register('price', { required: "Price is required" })} 
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input 
                            type="text" 
                            placeholder="https://image-link.com"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition"
                            {...register('image', { required: "Image link is required" })} 
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Italian, Fast Food"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition"
                            {...register('category')} 
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            rows="3"
                            placeholder="Briefly describe the dish..."
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition"
                            {...register('description')} 
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white transition
                            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'}`}
                    >
                        {loading ? 'Processing...' : 'Upload Data'}
                    </button>
                </form>

                {/* Status Messages */}
                <div className="mt-6 text-center text-sm">
                    {successMsg && (
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg animate-pulse">
                            {successMsg}
                        </div>
                    )}

                    {errorMsg && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                            {errorMsg}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddData;