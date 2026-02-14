import React, { useEffect, useState } from 'react';
import axiosClient from './axiosClient';

const Data = () => {
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/getfood");
        // Ensure we handle different data structures (e.g., response.data.food)
        setFoodData(response.data.food || response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // 2. Empty/Error State
  if (foodData.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <h1 className="text-3xl font-bold text-gray-400">No delicious food found... yet! 🍲</h1>
        <p className="mt-2 text-gray-500">Try adding some data from the upload section.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10">
      <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-12">
        Explore Our <span className="text-orange-600">Menu</span>
      </h1>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {foodData.map((item, idx) => (
          <div 
            key={idx} 
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600 shadow-sm">
                ${item.price}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 capitalize truncate">
                  {item.name}
                </h2>
                <span className="text-[10px] uppercase tracking-widest bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                {item.description || "No description provided for this delicious item."}
              </p>

              {/* Action Button (Optional) */}
              <div className="mt-auto pt-4 border-t border-gray-50">
                <button className="w-full bg-orange-50 text-orange-600 font-semibold py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;