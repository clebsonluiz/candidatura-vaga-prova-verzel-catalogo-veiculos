import React from 'react'
import PropTypes from 'prop-types'

const SearchInput = (props) => {
    return (
        <div className=" relative ">

            <input name={'search'} onChange={(e) => { }} id={`searchInput`} type='text' className=" w-full p-3 text-base text-gray-100 border border-gray-300 rounded-lg bg-gray-700 focus:ring-gray-500 focus:border-gray-500 "
                placeholder={'Buscar carros por nome, modelo, marca ...'}
                />
            {/* <button type="submit" className=" text-white absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs font-mono px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                CTRL + K
            </button> */}
            <button type="submit" className="inline-flex text-white absolute right-2 bottom-2 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>
    )
}

SearchInput.propTypes = {}

export default SearchInput