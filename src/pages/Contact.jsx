import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
<p>CONTACT US</p>
</div>


<div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
  <img className='w-full md:max-w-[360px]'src={assets.contact_image}/>



<div className='flex flex-col justify-center items-start gap-6'>
  <p className='font-semibold text-lg text-gray-700'>OUR OFFICE</p>
  <p>3403 city Ghaziabad State-U.P,INDIA</p>
  <p>Tel:(+91)6382-832-282 <br/> Email:navneetkumar991713@gmail.com</p>
  <p> Carrers at Doctors</p>
  <p> Learn  more about our team and job opening .</p>
  <button> Explore Jobs</button>
</div>
    </div>
    </div>
  )
}
export default Contact 
