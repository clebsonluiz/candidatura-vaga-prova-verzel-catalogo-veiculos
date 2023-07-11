import React from 'react'
import PropTypes from 'prop-types'
import { MAIN_EXTERNAL_URL } from '../../utils/apiUrls'

const AdminCarCard = ({ item, onDelete, onClick, onEdit }) => {

    return (
        <div className='inline-flex  h-24 w-full items-center'>
            <div

                onClick={(e) => onClick(item.id)}

                className='inline-flex h-20 w-full cursor-pointer border rounded-lg  border-gray-600 my-2'>

                <div className=' h-full w-1/3  '>
                    <img
                        className=' w-full h-full object-cover border-s-0 border-e-2 border-gray-600 rounded-s-md'
                        src={`${MAIN_EXTERNAL_URL}${item.photo}`}                >
                    </img>
                </div>

                <div className='w-2/3 flex p-2 flex-col text-gray-700'>
                    <div className=' h-1/3 text-xs  text-gray-700 inline-flex font-semibold text-clip overflow-hidden'>
                        {item.name}
                    </div>

                    <div className=' h-1/3 justify-start text-xs text-start font-semibold '>
                        <div>
                            {`${item.brand} • ${item.model}`}
                        </div>
                    </div>
                    <div className=' text-gray-700 inline-flex items-end justify-between'>
                        <div className=' text-xs  '>
                            {` ${item.year}`}
                        </div>
                        <div className='flex items-end text-sm font-semibold '>
                            {`R$ ${item.price}`}
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex-col flex'>
                <button
                    className={'m-1 p-1 border border-red-700 rounded-lg bg-red-600  hover:scale-110 active:scale-100 active:opacity-80'}
                    placeholder='remove' aria-label='remove'
                    onClick={(e) => onDelete(item.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </button>
                <button
                    className={'m-1 p-1 border border-orange-700 rounded-lg bg-orange-600  hover:scale-110 active:scale-100 active:opacity-80'}
                    placeholder='remove' aria-label='remove'
                    onClick={(e) => onEdit(item.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

AdminCarCard.propTypes = {}

export default AdminCarCard