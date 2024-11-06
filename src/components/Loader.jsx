// import React from 'react'
// import { dotSpinner } from "ldrs"
import { cardio } from 'ldrs'

const Loader = () => {
  cardio.register()

  return (
    <div className='container-loader'>
      <l-cardio
        size="50"
        stroke="4"
        speed="2" 
        color="black" 
      ></l-cardio>
    </div>

  )
}

export default Loader