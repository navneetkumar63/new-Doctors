import React from 'react'
import { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)
  return (
    <div>

<p>My Appointment</p>
<div>
  {doctors.slice(0,2).map((item,index)=>(
    <div key={index}>
      <div>
        <img src={item.image} />
        </div>
        </div>
  ))}
</div>
 
    </div>
  )
}

export default MyAppointments