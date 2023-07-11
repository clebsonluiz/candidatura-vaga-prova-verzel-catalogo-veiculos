import { useState } from 'react'

import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import allRoutes from './routes/all.routes'


function App() {

  return (
    <AuthProvider >
      <RouterProvider router={allRoutes} />
    </AuthProvider>
  )
}

export default App
