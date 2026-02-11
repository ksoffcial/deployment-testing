import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axiosClient from './axiosClient';


const AddData = () => {
    const [sucessMsg, setSucessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onsubmit = async (data) => {
        try {
            setLoading(true)
            setErrorMsg('')
            setSucessMsg('')
            const response = await axiosClient.post("/addFood", data)
            // console.log(response.data)
            setSuccessMsg(response.data.message || 'Data added successfully 🎉')
            reset()
        }
        catch (error) {
            setErrorMsg(
                error.response?.data?.message || 'Something went wrong 😢'
            )
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className='my-10'>
            <h1 className='text-center font-bold mt-8 text-4xl'>this is the section to upload the data form the fronnted form the user </h1>
            <form onSubmit={handleSubmit(onsubmit)}>

                <input type="text" placeholder='Enter the food name ' {...register('name')} />
                <input type="text" placeholder='Enter the price of food '{...register('price')} />
                <input type="link" placeholder='Enter the price of image link '{...register('image')} />
                <input type="text" placeholder='Enter the category' {...register('category')} />
                <input type="text" placeholder='Enter the description' {...register('description')} />
                <button type='submit'>submit </button>
            </form>

            {/* Success Message */}
            {sucessMsg && (
                <p className="text-green-600 text-center mt-4">
                    {sucessMsg}
                </p>
            )}

            {/* Error Message */}
            {errorMsg && (
                <p className="text-red-600 text-center mt-4">
                    {errorMsg}
                </p>
            )}
       

        </div >
    )
}
export default AddData