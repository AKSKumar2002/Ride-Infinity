import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddBike = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)
  const [bike, setBike] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    engineCapacity: '',
    bikeType: '',
    mileage: '',
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('bikeData', JSON.stringify(bike))

      const {data} = await axios.post('/api/owner/add-bike', formData)

      if(data.success){
        toast.success(data.message)
        setImage(null)
        setBike({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          engineCapacity: '',
          bikeType: '',
          mileage: '',
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title title="Add New Bike" subTitle="Fill in details to list a new bike for booking, including pricing, availability, and bike specifications."/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* Bike Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="bike-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
            <input type="file" id="bike-image" accept="image/*" hidden onChange={e=> setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your bike</p>
        </div>

        {/* Bike Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type="text" placeholder="e.g. Honda, Yamaha, Royal Enfield..." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.brand} onChange={e=> setBike({...bike, brand: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type="text" placeholder="e.g. R15, Classic 350..." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.model} onChange={e=> setBike({...bike, model: e.target.value})}/>
          </div>
        </div>

        {/* Bike Year, Price, Engine Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type="number" placeholder="2023" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.year} onChange={e=> setBike({...bike, year: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input type="number" placeholder="300" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.pricePerDay} onChange={e=> setBike({...bike, pricePerDay: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label>Engine Capacity (cc)</label>
            <input type="text" placeholder="e.g. 150cc, 350cc" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.engineCapacity} onChange={e=> setBike({...bike, engineCapacity: e.target.value})}/>
          </div>
        </div>

        {/* Bike Type and Mileage */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Bike Type</label>
            <select onChange={e=> setBike({...bike, bikeType: e.target.value})} value={bike.bikeType} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select type</option>
              <option value="Cruiser">Cruiser</option>
              <option value="Sports">Sports</option>
              <option value="Scooter">Scooter</option>
              <option value="Commuter">Commuter</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Mileage (km/l)</label>
            <input type="text" placeholder="e.g. 40 km/l" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.mileage} onChange={e=> setBike({...bike, mileage: e.target.value})}/>
          </div>
        </div>

         {/* Bike Location */}
         <div className='flex flex-col w-full'>
            <label>Location</label>
            <select onChange={e=> setBike({...bike, location: e.target.value})} value={bike.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a location</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
         </div>

        {/* Bike Description */}
         <div className='flex flex-col w-full'>
            <label>Description</label>
            <textarea rows={5} placeholder="e.g. A sporty bike perfect for city rides and highway tours." required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.description} onChange={e=> setBike({...bike, description: e.target.value})}></textarea>
          </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Bike'}
        </button>

      </form>

    </div>
  )
}

export default AddBike
