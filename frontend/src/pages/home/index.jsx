import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'

import CarCard from '../../components/CarCard'
import SearchInput from '../../components/SearchInput'
import DropdownNavFilter from '../../components/DropdownNavFilter'
import DropdownNavUser from '../../components/DropdownNavUser'
import useAuth from '../../hooks/useAuth'
import { API_URL_CARS } from '../../utils/apiUrls'


const HomePage = ({ ...props }) => {

    const { user } = useAuth();
    const [isFetching, setIsFetching] = useState(true);
    const [fetchData, setFetchData] = useState([]);

    const [filterBy, setFilterBy] = useState('')
    const [orderBy, setOrderBy] = useState('')

    useEffect(() => {
        if (isFetching == true) {
            var fetchURL = `${API_URL_CARS}`
            fetchURL = `${API_URL_CARS}?filterby=${filterBy}&orderby=${orderBy}`
            fetch(fetchURL, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then(setFetchData).finally(() => setIsFetching(false))
        }
    }, [isFetching])

    return (
        <div className='p-2' >

            <div className=' bg-gray-600 w-full h-16 flex items-center justify-between rounded-t-lg px-2 '>
                <div className=' w-1/5 px-2 inline-flex gap-2 '>
                    <img src={viteLogo} alt="Logo" />
                    <h1 className='text-2xl font-bold'>Vite</h1>
                </div>

                <div className=' w-1/12 p-[1px] bg-white rounded-full'></div>
                <h1 className='text-xl font-bold'>Catálogo de veículos</h1>
                <div className=' w-1/12 p-[1px] bg-white rounded-full'></div>

                <DropdownNavUser user={user} />
            </div>


            <div className='sticky top-0 z-10  bg-gray-600 w-full h-16 flex items-center rounded-b-lg px-2 '>

                <div className='w-full px-10'>
                    <form id={`formSearch`} onSubmit={(e) => {
                        e.preventDefault();
                        setFilterBy(e.target.searchInput.value ?? '')
                        setIsFetching(true);
                    }} action="#" method="POST">
                        <SearchInput />
                    </form>
                </div>

            </div>

            <div className=' sticky top-16 z-10  h-16 flex items-center flex-col px-10 bg-zinc-900'>

                <div className='w-full h-full flex items-center justify-between'>
                    <button type="button" aria-label="Mostrar/Ocultar filtros" className='inline-flex gap-2 items-center font-semibold hover:opacity-80'>
                        <svg className='h-5 w-5' fill="currentColor" viewBox="0 0 1024 1024"><path d="M405.335 832H618.67V725.335H405.335V832zM32 192v106.665h960V192H32zm160 373.335h640V458.67H192v106.665z"></path></svg>
                        Mostar filtros
                    </button>

                    <div className=' basis-2/5 inline-flex gap-4 items-start '>
                        <button onClick={e => {
                            setFilterBy('')
                            setOrderBy('last')
                            setIsFetching(true)

                        }} type="button" aria-label="remover filtros" className='text-gray-500 inline-flex gap-2 items-center font-semibold hover:opacity-80'>
                            Remover filtros
                        </button>

                        <div className=' text-gray-500'>
                            {`${fetchData?.length} Resultados`}
                        </div>
                    </div>

                    <DropdownNavFilter orderBy={
                        orderBy == 'min' ? 1 : orderBy == 'max' ? 2 : 0
                    } onChange={(i, item) => {
                        var order = ''
                        if (i == 0) { order = 'last' }
                        if (i == 1) { order = 'min' }
                        if (i == 2) { order = 'max' }
                        setOrderBy(order)
                        setIsFetching(true)
                    }} />

                </div>


            </div>

            <div className='flex md:flex-row'>
                {/* <div className='bg-gray-400 flex md:basis-1/4  '>
                    <div className='overflow-auto h-screen w-full'>

                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                        <div className=' p-2'>
                            A
                        </div>
                    </div>
                </div> */}

                <div className=''>
                    <div className='w-full p-2 flex flex-wrap gap-4 justify-center justify-items-center'>
                        {
                            !isFetching && fetchData?.map((data, i) => (

                                <CarCard key={`carcard${i}`} data={data} />
                            ))
                        }

                        {
                            !fetchData.isFetching && fetchData.data?.length <= 0 && (
                                <div className='h-full w-full flex gap-4 justify-center justify-items-center p-10 text-white'>


                                    <span>Não temos carros para exibir!</span>
                                </div>
                            )
                        }

                        {
                            fetchData.isFetching && fetchData.data?.length <= 0 && (
                                <div className='h-full w-full flex gap-4 justify-center justify-items-center p-10 text-white'>
                                    <div className=''>
                                        <img src={reactLogo} alt='react logo' className='animate-spin-slow' />
                                    </div>
                                    <span>Carregando conteudo da pagina</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <footer className='bg-gray-950 h-fit w-full sticky z-10 rounded-b-lg flex flex-col'>

                <div className='flex flex-row py-8 px-4'>
                    <div className="basis-1/4 flex justify-center items-center ">
                        <img src={viteLogo} alt="" className='h-20' />
                    </div>
                    <div className="basis-1/4 flex flex-col gap-4">

                        <a className='hover:underline w-fit' href="/404"> Vender carro</a>
                        <a className='hover:underline w-fit' href="/404"> Comprar carro</a>
                        <a className='hover:underline w-fit' href="/404"> Onde estamos</a>

                    </div>
                    <div className="basis-1/4  flex flex-col gap-4">

                        <a className='hover:underline w-fit' href="/404"> Blog</a>
                        <a className='hover:underline w-fit' href="/404"> Guia de preços</a>
                        <a className='hover:underline w-fit' href="/404"> Carreiras</a>
                    </div>
                    <div className="basis-1/4  flex flex-col gap-4">

                        <a className='hover:underline w-fit' href="/404">  Contato</a>
                        <a className='hover:underline w-fit' href="/404">Imprensa</a>
                        <button className='w-fit'>🇧🇷 Brasil</button>
                    </div>
                </div>

                <div className='basis-2/4 w-fit pb-10 relative left-20 flex self-start gap-4'>
                    <button className='border-2 border-white border-solid p-1 m-1 rounded-full hover:-translate-y-0 hover:scale-110 duration-100 hover:text-pink-700 hover:bg-white'>
                        <a href="https://www.instagram.com/cleb.dev/" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 "
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a></button>

                    <button className='border-2 border-white border-solid p-1 m-1 rounded-full hover:-translate-y-0 hover:scale-110 duration-100 hover:text-cyan-950 hover:bg-white'>

                        <a href="https://www.linkedin.com/in/cl%C3%A9bson-luiz/" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </a></button>



                    <button className='border-2 border-white border-solid p-1 m-1 rounded-full hover:-translate-y-0 hover:scale-110 duration-100 hover:text-black hover:bg-white'>

                        <a href="https://github.com/clebsonluiz" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a></button>
                </div>

                <div className='bg-gray-50 m-10 p-[1px]'>

                </div>

                <div className='mx-10 px-4 py-2 flex gap-2'>
                    <span>
                        Copyright © 2023 NON_DEFINED. Todos os direitos reservados?.
                    </span>
                    <a className='hover:underline w-fit' href="/404"> Política de Privacidade</a>
                    ·
                    <a className='hover:underline w-fit' href="/404"> Termos e Condições</a>

                </div>
                <p className='mx-10 p-4 pb-10'>
                    NON_DEFINED TECNOLOGIA E COMERCIO DE VEICULOS LTDA., inscrita no CNPJ sob o nº 00.000.000/0000-00, com sede na __________, nº ___, Galpão _, Módulo _, ______ _____, Serra Talhada/PE, CEP 00.000-000
                </p>
            </footer>

        </div>
    )
}

HomePage.propTypes = {}

export default HomePage;