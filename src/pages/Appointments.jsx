import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointments = () => {

  const {docId} = useParams()
const {doctors,currencySymbol} = useContext(AppContext)
const dayOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

const [docInfo,setDocInfo] = useState(null)
const [docSlots,setDocSlots] = useState([])
const [slotIndex,setSlotIndex] =useState(0)
const [slotTime,setSlotTime] = useState('')
 
const fetchDocInfo = async () => {
  const docInfo = doctors.find(doc => doc._id === docId)
  setDocInfo(docInfo)

}

const getAvailableSlot =async () =>{
setDocSlots([])

// getting current gate
let today = new Date()

for(let i=0;i<7;i++){
  //getting gate with index
  let currentDate = new Date(today)
  currentDate.setDate(today.getDate()+i)

  //setting end time of the date with index
  let endTime = new Date()
  endTime.setDate(today.getDate()+i)
  endTime.setHours(21,0,0,0)

  //setting hours
  if(today.getDate === currentDate.getDate()){
    currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours() + 1 :10)
    currentDate.setMinutes(currentDate.getMinutes()>10 ? currentDate.getMinutes() + 1 :10)
  }
  else{
    currentDate.setHours(10)
    currentDate.setMinutes(0)
  }

  let timeSlots =[]
  while(currentDate<endTime){
     let formattedTime = currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  
     //add slots to array
     timeSlots.push({
      datetime : new Date(currentDate),
      time:formattedTime
     })

     // Increment current time by 30 minutes
     currentDate.setMinutes(currentDate.getMinutes()+30)
    }

    setDocSlots(prev =>([...prev,timeSlots]))
}
}

useEffect(()=>{
fetchDocInfo(docInfo)
},[doctors,docId])


useEffect(()=>{
getAvailableSlot()
},docInfo)


useEffect(()=>{
console.log(docSlots)
},[docSlots])

  return  docInfo  && (
    <div>
        {/*-----------------Doctors Details-----------------*/}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
           <img className='bg-pink-300 w-full sm:max-w-72 rounded-lg' src={docInfo.image}/>
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/*------------------DocInfo name,degree,experience*/}
            <p className='flex items-center gap-2 text-2xl font-medium text-green-900'>{docInfo.name}
               <img className='w-5'src={assets.verified_icon}/></p>
               <div className='flex items-center gap-2 text-sm mt-1 text-green-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
               </div>

               {/*----------Doctor about -------------*/}

               <div>
                <p className='flex items-center gap-1 text-sm font-medium text-green-900 mt-3'>
                  About <img src={assets.info_icon}/>
                </p>
                <p className='text-sm text-gray-500 max-w-[720] mt-1'>{docInfo.about}</p>
               </div>
               <p className='text-gray-500 font-medium mt-4'>
                Appointment fees:<span className='text-gray-500'>{currencySymbol}{docInfo.fees}</span>
               </p>
          </div>
        </div>


        {/*-------------  Booking slots----------------*/}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-900'>
<p>Booking Slots</p>
<div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
  {
    docSlots.length && docSlots.map((item,index)=>(
<div onClick ={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-pink-300 text-white':'border border-gray-200'}`} key ={index}>
  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
  <p>{item[0] && item[0].datetime.getDay()}</p>
  </div>
    ))
  }
</div>

<div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
  {docSlots.length && docSlots[slotIndex].map((item,index)=>(
<p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light lex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time ===slotTime ? 'bg-pink-500 text-white' : 'text-gray-500 border border-gray-300'}`} key={index}>
{item.time.toLowerCase()}
</p>
  ))}
</div>

<button className='bg-pink-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 mt-7'>
  Book an Appointment
</button>
    </div>

    {/*-------------------Listing Related Doctors */}

    <RelatedDoctors  docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointments