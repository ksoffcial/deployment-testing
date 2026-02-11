import React, { useEffect, useState } from 'react'
import axiosClient from './axiosClient'


const Data = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resposne = await axiosClient.get("/getfood");
      setFoodData(resposne.data)
    }
    fetchData();
  }, [])

  if(foodData.length == 0){
    return(
      <div>
        <h1 className='text-center text-4xl font-bold mt-10'>Data is not avaible due to some reason </h1>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-3xl text-center font-bold mb-8 mt-4'> Food details are  here  </h1>
      <div className='flex flex-wrap gap-4 px-8 justify-center'>
        {foodData.map((value, idx) => (
          <div key={idx} className='border rounded-xl h-90 w-70 p-4 overflow-hidden' >
            <h1 className='text-center font-bold text-xl'>{value.name}</h1>
            <div className='flex justify-between px-4 mb-4 mt-6'>
              <h2 className='bg-green-500 px-4 rounded-lg'>{value.price} </h2>
              <h2 className='bg-green-500 px-4 rounded-lg'>{value.category} </h2>
            </div>
            <img src={value.image} alt="" className='w-full h-[50%] rounded-xl' />
            <p>{value.description} </p>  
          </div>
        ))}
      </div>
    </div>
  )
}

export default Data