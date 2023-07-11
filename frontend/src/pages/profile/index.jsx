import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import viteLogo from '/vite.svg'
import DropdownNavUser from '../../components/DropdownNavUser'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const ProfilePage = props => {

  const authContext = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.getStoredToken().refresh) {
      navigate('/');
    }
  }, [])

  return (

    !authContext.isFetching && authContext.user ?

      <div className='flex-row'>

        <div className=' bg-zinc-600 mb-0 m-2 rounded-lg'>
          <div className=' bg-gray-600 w-full h-16 flex items-center justify-between rounded-lg px-2 '>
            <div className=' w-1/5 px-2 inline-flex gap-2 '>
              <img src={viteLogo} alt="Logo" />
              <h1 className='text-2xl font-bold'>Vite</h1>
            </div>

            <div className=' w-1/12 p-[1px] bg-white rounded-full'></div>
            <h1 className='text-xl font-bold'>Catálogo de veículos</h1>
            <div className=' w-1/12 p-[1px] bg-white rounded-full'></div>

            <DropdownNavUser user={authContext.user} />
          </div>

        </div>

        <div className='md:flex p-2 gap-2'>

          <div className='w-full gap-2  '>

            <div className="w-full max-w-sm mx-auto bg-zinc-100 text-gray-800 p-8 rounded-md shadow-md">
              <div className='inline-flex gap-2'>
                <div className="mb-4 border rounded-lg p-2">
                  <label className="block text-gray-500 text-xs font-bold mb-2" >Nome</label>
                  <label className="block text-gray-700 text-sm font-bold mb-2" >{authContext.user.data.first_name ?? "------"}</label>
                </div>
                <div className="mb-4 border rounded-lg p-2">
                  <label className="block text-gray-500 text-xs font-bold mb-2" >Sobrenome</label>
                  <label className="block text-gray-700 text-sm font-bold mb-2" >{authContext.user.data.last_name ?? "------"}</label>
                </div>
              </div>
              <div className="mb-4 border rounded-lg p-2">
                <label className="block text-gray-500 text-xs font-bold mb-2" >Username</label>
                <label className="block text-gray-700 text-sm font-bold mb-2" >{authContext.user.data.username ?? "------"}</label>
              </div>
              <div className="mb-4 border rounded-lg p-2">
                <label className="block text-gray-500 text-xs font-bold mb-2" >Email</label>
                <label className="block text-gray-700 text-sm font-bold mb-2" >{authContext.user.data.email ?? "-----"}</label>
              </div>
            </div>


          </div>
        </div>



      </div>

      :

      <div>
        <div id="error-page" className='w-screen h-screen flex-row justify-center items-center text-center '>
          <div className="p-10">

          </div>
        </div>
      </div>
  )
}

ProfilePage.propTypes = {}

export default ProfilePage