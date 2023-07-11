import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const RegisterPage = (props) => {

  const [formData, setFormData] = useState({ username: '', password: '', first_name: '', last_name: '' });

  const authContext = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (authContext.getStoredToken().refresh) {
      navigate('/');
    }
  }, [])

  const handleChangeData = (event) => {

    let data = { ...formData };
    data[event.target.name] = event.target.value;
    setFormData(data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    authContext.signOut(formData)
  }




  return (
    <div className='flex'>

      <div className=' basis-1/3 shadow-lg shadow-white min-h-screen max-h-full flex-col flex items-center justify-center text-5xl font-bold'>
        <h1 className="text-2xl font-bold mb-6 text-center">Formulário de Resgistro</h1>
        <div className='flex items-center justify-center'>
          <img src={viteLogo} alt="Logo" className='animate-pulse h-24' />
          +
          <img src={reactLogo} alt="Logo" className='animate-spin-slow h-24' />
        </div>
      </div>
      <div className='basis-2/3 flex items-center justify-center'>

        <form onSubmit={onSubmit} method='POST' action='#' className="w-full max-w-sm mx-auto bg-zinc-100 text-gray-800 p-8 rounded-md shadow-md">
          <div className='inline-flex gap-2'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nome</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="name" name="first_name" placeholder="John" value={formData.first_name} onChange={handleChangeData} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Sobrenome</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="lastname" name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleChangeData} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Usuário</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text" id="username" name="username" placeholder="john.example123" value={formData.username} onChange={handleChangeData} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Senha</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChangeData} required />
          </div>

          <button
            className="w-full mb-2 bg-gray-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            type="submit">Registrar-se</button>

          <a href='/login'>
            <button
              className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="button">Já possui uma conta?</button>
          </a>
        </form>
      </div>



    </div>
  )
}

RegisterPage.propTypes = {}

export default RegisterPage