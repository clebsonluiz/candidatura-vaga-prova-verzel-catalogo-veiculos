import React, { useEffect, useState } from 'react'
import AdminCarCard from '../../components/AdminCarCard'
import CarForm from '../../components/CarForm'
import CarInfo from '../../components/CarInfo'
import DropdownNavFilter from '../../components/DropdownNavFilter'
import DropdownNavUser from '../../components/DropdownNavUser'
import useAuth from '../../hooks/useAuth'
import { API_URL_CARS } from '../../utils/apiUrls'
import viteLogo from '/vite.svg'


const AdminPage = ({ ...props }) => {

    const authContext = useAuth()

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

    const [formMode, setFormMode] = useState(0)

    const [viewCarData, setViewCarData] = useState(undefined)


    return (

        authContext.user && authContext.user.data.is_admin ?

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
                    <aside className='w-2/5 h-full '>
                        <div className='rounded-lg bg-zinc-200 w-full p-2 inline-flex items-center gap-2 '>
                            <img src={viteLogo} alt="Logo" className=' h-6' />
                            <form className='' onSubmit={
                                e=> {
                                    e.preventDefault();
                                    setFilterBy(e.target.search.value ?? '')
                                    setIsFetching(true);
                                }
                            } action="#" method='POST'>
                                <input className="w-full text-gray-800 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                type="text" id="search" name="search" placeholder="Nome, Marca, cor..." />

                            </form>
                            <button
                                className=" bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                                type="button"
                                onClick={(e) => setFormMode(1)}
                            >Novo</button>
                        </div>
                        <div className='w-full border flex justify-end rounded-lg mt-2 px-2'>
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

                        <div className='w-full h-screen gap-2 mt-2 rounded-lg overflow-auto  bg-gray-200 p-2 '>

                            {
                                !isFetching && fetchData && fetchData?.map((el, i) => {
                                    return (
                                        <AdminCarCard key={`kcardA${i}`} item={el}
                                            onClick={(e) => {
                                                setFormMode(3)
                                                setViewCarData(el)
                                            }}
                                            onDelete={(id) => {
                                                fetch(`${API_URL_CARS}${id}`, {
                                                    method: "DELETE",
                                                    mode: "cors",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': `Bearer ${authContext.getStoredToken().token}`
                                                    }
                                                }).finally(()=>setIsFetching(true))
                                            }}
                                            onEdit={(e) => {
                                                setFormMode(2)
                                                setViewCarData(el)
                                            }} />
                                    )
                                })
                            }

                        </div>
                        {/* <div className='flex items-center justify-center'>
                    <img src={viteLogo} alt="Logo" className='animate-pulse h-24' />
                    +
                    <img src={reactLogo} alt="Logo" className='animate-spin-slow h-24' />
                </div> */}
                    </aside>
                    <div className='w-full gap-2  '>

                        {/* <div className='bg-zinc-100 p-2 rounded-lg  '>

                    </div> */}
                        {
                            formMode === 1 &&
                            <div className='border rounded-lg w-full'>
                                <CarForm onSubmit={(data) => {
                                    //    var form = new FormData()

                                    // Object.keys(data).map((key, i)=> {
                                    //     console.log(key)
                                    //     form.append(key, data[key])
                                    // })

                                    // console.log(form);
                                    fetch(`${API_URL_CARS}`, {
                                        mode: "cors",
                                        body: data,
                                        method: "POST",
                                        headers: {
                                            'Authorization': `Bearer ${authContext.getStoredToken().token}`
                                        }
                                    }).then((res) => {
                                        if (res.status == 201) {
                                            setIsFetching(true);
                                        }
                                        return res.json();
                                    })

                                }} onClose={(e) => {
                                    setFormMode(0)
                                }} />
                            </div>
                        }

                        {
                            formMode === 2 &&
                            <div className='border rounded-lg w-full'>
                                <CarForm formData={viewCarData} onSubmit={console.log} onClose={(e) => {
                                    setFormMode(0)
                                }} />
                            </div>
                        }

                        {
                            formMode === 3 &&
                            <div className='border rounded-lg w-full'>
                                <CarInfo formData={viewCarData} onClose={(e) => {
                                    setFormMode(0)
                                }} />
                            </div>
                        }

                    </div>
                </div>



            </div>


            :

            <div>
                <div id="error-page" className='w-screen h-screen flex-row justify-center items-center text-center '>
                    <div className="p-10">
                        <h1 className='text-4xl'>Oops!</h1>
                        <p>Algum erro ocorreu!.</p>
                        <p>
                            <i>Not Found</i>
                        </p>
                    </div>
                </div>
            </div>
    )
}

AdminPage.propTypes = {}

export default AdminPage