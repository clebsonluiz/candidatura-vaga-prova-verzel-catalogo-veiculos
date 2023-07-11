import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useAuth from '../../hooks/useAuth'

const DropdownNavUser = ({ onChange, user, ...props }) => {

    const { logout } = useAuth();

    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(0)

    // const filter = [
    //     "Menor Preço",
    //     "Maior Preço",
    //     "Ultimos adicionados",
    // ];

    return (
        user ?

            (<div className='relative '>
                <button onClick={e => setVisible(!visible)} tabIndex="0" type="button" className="form-control inline-flex justify-center  items-center  gap-2 py-2 font-semibold hover:opacity-80">
                    <div className=' h-8 w-8 flex justify-center items-center'>
                        <svg viewBox="0 0 1024 1024"><path d="M512 32.025c-127.298 0-249.379 50.567-339.393 140.582S32.025 384.702 32.025 512c0 127.3 50.567 249.379 140.582 339.394S384.702 991.975 512 991.975c127.3 0 249.379-50.566 339.394-140.581S991.975 639.3 991.975 512c0-127.298-50.566-249.379-140.581-339.393S639.3 32.025 512 32.025zM224.821 224.821A406.134 406.134 0 0 1 918.132 512a406.137 406.137 0 0 1-109.464 277.365 377.907 377.907 0 0 0-111.635-95.428 377.865 377.865 0 0 0-370.061 0 377.948 377.948 0 0 0-111.638 95.428 406.13 406.13 0 0 1 9.487-564.544zm45.77 613.778a304.046 304.046 0 0 1 92.537-80.277 304.057 304.057 0 0 1 148.871-38.945 304.044 304.044 0 0 1 241.41 119.216 406.107 406.107 0 0 1-241.41 79.539 406.14 406.14 0 0 1-241.409-79.533zm162.064-620.367a207.337 207.337 0 0 1 158.695 0 207.366 207.366 0 0 1 112.222 112.219c10.417 25.156 15.783 52.121 15.783 79.349s-5.366 54.195-15.783 79.35a207.383 207.383 0 0 1-44.951 67.266 207.282 207.282 0 0 1-67.271 44.951c-25.155 10.423-52.118 15.783-79.345 15.783s-54.195-5.36-79.35-15.783a207.354 207.354 0 0 1-67.268-44.951c-19.254-19.253-34.527-42.109-44.947-67.266s-15.784-52.123-15.784-79.35c0-27.229 5.362-54.193 15.784-79.349s25.695-48.015 44.947-67.27a207.375 207.375 0 0 1 67.268-44.949zm79.35 58.059a133.53 133.53 0 0 0-51.094 10.162c-16.195 6.709-30.915 16.545-43.31 28.94s-22.23 27.115-28.94 43.313a133.508 133.508 0 0 0 72.25 174.435A133.529 133.529 0 0 0 606.408 504.2a133.436 133.436 0 0 0 28.935-43.31 133.533 133.533 0 0 0 10.166-51.093c0-17.533-3.456-34.893-10.166-51.091a133.48 133.48 0 0 0-28.935-43.313 133.524 133.524 0 0 0-94.403-39.102z" /></svg>
                    </div>
                    <span className="text-white"> Minha Conta </span>
                    <div className='h-5 w-5 fill-blue-300 flex items-center'>
                        <svg className={`${visible && 'rotate-180'}  `} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>

                <div className={`${!visible && 'hidden '} absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none shadow-sm shadow-white `} tabIndex="-1">
                    <div className="p-1" role="none">
                        {
                            user.data.is_admin &&
                            <a key={`navDropI0`} href="/admin" onClick={(e) => {
                                setVisible(false);
                            }} className="inline-flex items-center gap-2 w-full hover:bg-gray-500 hover:text-gray-100 text-gray-400 px-4 py-2 " id={`menu-item-1`}  >
                                =ADMIN PAGE=</a>
                        }
                        <a key={`navDropI1`} href="/profile" onClick={(e) => {
                            setVisible(false);
                        }} className="inline-flex items-center gap-2 w-full hover:bg-gray-500 hover:text-gray-100 text-gray-400 px-4 py-2 " id={`menu-item-1`}  >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                            </svg>

                            Perfil</a>
                        <a key={`navDropI2`} href="#" onClick={(e) => {
                            logout()
                        }} className="inline-flex items-center gap-2 w-full hover:bg-gray-500 hover:text-gray-100 text-gray-400 px-4 py-2 " id={`menu-item-2`}  >

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>

                            Sair</a>


                        {
                    /* <a key={`navDropI${i}`} href="#" onClick={(e) => {
                        setCurrent(i);
                        setVisible(false);
                        onChange(i, item);
                    }} className="hover:bg-gray-500 hover:text-gray-100 text-gray-400 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${i}`}  >{item}</a>

                    <a key={`navDropI${i}`} href="#" onClick={(e) => {
                        setCurrent(i);
                        setVisible(false);
                        onChange(i, item);
                    }} className="hover:bg-gray-500 hover:text-gray-100 text-gray-400 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${i}`}  >{item}</a>

                    <a key={`navDropI${i}`} href="#" onClick={(e) => {
                        setCurrent(i);
                        setVisible(false);
                        onChange(i, item);
                    }} className="hover:bg-gray-500 hover:text-gray-100 text-gray-400 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${i}`}  >{item}</a>
 */}

                    </div>
                </div>
            </div>
            )
            :
            (
                <a href='/register' className='border flex p-2 items-center justify-end rounded-xl shadow-sm shadow-black hover:opacity-80 active:opacity-100'>
                    <div className=' h-8 w-8 flex justify-center items-center'>
                        <svg viewBox="0 0 1024 1024"><path d="M512 32.025c-127.298 0-249.379 50.567-339.393 140.582S32.025 384.702 32.025 512c0 127.3 50.567 249.379 140.582 339.394S384.702 991.975 512 991.975c127.3 0 249.379-50.566 339.394-140.581S991.975 639.3 991.975 512c0-127.298-50.566-249.379-140.581-339.393S639.3 32.025 512 32.025zM224.821 224.821A406.134 406.134 0 0 1 918.132 512a406.137 406.137 0 0 1-109.464 277.365 377.907 377.907 0 0 0-111.635-95.428 377.865 377.865 0 0 0-370.061 0 377.948 377.948 0 0 0-111.638 95.428 406.13 406.13 0 0 1 9.487-564.544zm45.77 613.778a304.046 304.046 0 0 1 92.537-80.277 304.057 304.057 0 0 1 148.871-38.945 304.044 304.044 0 0 1 241.41 119.216 406.107 406.107 0 0 1-241.41 79.539 406.14 406.14 0 0 1-241.409-79.533zm162.064-620.367a207.337 207.337 0 0 1 158.695 0 207.366 207.366 0 0 1 112.222 112.219c10.417 25.156 15.783 52.121 15.783 79.349s-5.366 54.195-15.783 79.35a207.383 207.383 0 0 1-44.951 67.266 207.282 207.282 0 0 1-67.271 44.951c-25.155 10.423-52.118 15.783-79.345 15.783s-54.195-5.36-79.35-15.783a207.354 207.354 0 0 1-67.268-44.951c-19.254-19.253-34.527-42.109-44.947-67.266s-15.784-52.123-15.784-79.35c0-27.229 5.362-54.193 15.784-79.349s25.695-48.015 44.947-67.27a207.375 207.375 0 0 1 67.268-44.949zm79.35 58.059a133.53 133.53 0 0 0-51.094 10.162c-16.195 6.709-30.915 16.545-43.31 28.94s-22.23 27.115-28.94 43.313a133.508 133.508 0 0 0 72.25 174.435A133.529 133.529 0 0 0 606.408 504.2a133.436 133.436 0 0 0 28.935-43.31 133.533 133.533 0 0 0 10.166-51.093c0-17.533-3.456-34.893-10.166-51.091a133.48 133.48 0 0 0-28.935-43.313 133.524 133.524 0 0 0-94.403-39.102z" /></svg>
                    </div>
                    <span className='px-2 font-semibold '>
                        Cadastre-se
                    </span>
                </a>
            )
    )
}

DropdownNavUser.propTypes = {}

export default DropdownNavUser