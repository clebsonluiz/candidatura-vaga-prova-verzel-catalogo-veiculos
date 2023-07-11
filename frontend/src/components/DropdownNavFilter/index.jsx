import React, { useState } from 'react'
import PropTypes from 'prop-types'

const DropdownNavFilter = ({ onChange, orderBy, ...props }) => {
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(
        orderBy ?? 0
    )

    const filter = [
        "Ultimos adicionados",
        "Menor Preço",
        "Maior Preço",
    ];

    return (
        <div className='relative '>
            <button onClick={e => setVisible(!visible)} tabIndex="0" type="button" className="form-control inline-flex justify-center  items-center  gap-2 py-2 font-semibold hover:opacity-80">
                <span className=""> Ordenar: </span>
                <span className="text-blue-300"> {filter[current]} </span>

                <div className='h-5 w-5 fill-blue-300 flex items-center'>
                    <svg className={`${visible && 'rotate-180'}  `} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
            </button>

            <div className={`${!visible && 'hidden'} absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none shadow-sm shadow-white `} tabIndex="-1">
                <div className="p-1" role="none">
                    {
                        filter.map((item, i) => {
                            return (

                                <a key={`navDropI${i}`} href="#" onChange={e => {
                                    setCurrent(i);
                                    setVisible(false);
                                    onChange(i, item);

                                }} onClick={(e) => {
                                    setCurrent(i);
                                    setVisible(false);
                                    onChange(i, item);
                                }} className="hover:bg-gray-500 hover:text-gray-100 text-gray-400 block px-4 py-2 text-sm" role="menuitem" id={`menu-item-${i}`}  >{item}</a>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

DropdownNavFilter.propTypes = {}

export default DropdownNavFilter