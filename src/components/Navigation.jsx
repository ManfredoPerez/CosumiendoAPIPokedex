// import React from 'react'

import { Outlet } from "react-router-dom"

const Navigation = () => {
  return (
    <div>
        <h1>Navegacion</h1>
        <Outlet />
    </div>
  )
}

export default Navigation