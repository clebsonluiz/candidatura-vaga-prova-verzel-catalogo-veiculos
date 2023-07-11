import React from 'react'
import PropTypes from 'prop-types'
import { MAIN_EXTERNAL_URL } from '../../utils/apiUrls'


const transmission_type = {
    'Manual': 'MANUAL',
    'Automático': 'AUTOMATIC',
    'Automatizado': 'AUTOMATIZED'
}

const motor_type = {
    'Híbrido': 'HYBRID',
    'Combustão': 'COMBUSTION',
    'Eletríco': 'ELETRIC'
}

const fuel_type = {
    'Gasolina comum': 'Regular gasoline',
    'Gasolina Aditivada': 'Additive gasoline',
    'Gasolina premium': 'Premium gasoline',
    'Etanol': 'Ethanol',
    'Etanol aditivado': 'Additive Ethanol',
    'Diesel comum': 'Regular Diesel',
    'Diesel S-10': 'Diesel S10',
    'Diesel aditivado': 'Additive Diesel',
    'Diesel premium': 'Premium Diesel',
    'GNV (GAS NATURAL)': 'CNG',
    ' Eletricidade': 'Eletricity',
}

const color = {
    'PRETO': 'black',
    'BRANCO': 'white',
    'CINZA': 'gray',
    'VERMELHO': 'red',
    'AMARELO': 'yellow',
    'AZUL': 'blue',
    'OUTRA': '---'
}

const CarCard = ({ data, ...props }) => {
    return (
        <div onClick={console.log} className=' cursor-pointer hover:shadow-lg hover:scale-[99%] active:scale-100 border border-gray-700 h-60 w-60 rounded-md shadow-sm shadow-black'>

            <div className='flex w-full h-3/5 relative '>

                <img
                    className=' w-full h-full object-cover  rounded-t-md'
                    src={`${MAIN_EXTERNAL_URL}${data.photo}`}                >
                </img>

            </div>
            <div className='flex h-2/5 flex-col items-start p-2'>
                <div className=' h-20 inline-flex text-xl font-semibold text-clip overflow-hidden'>
                    {data.name}
                </div>
                <div className='inline-flex gap-2 justify-start text-base font-semibold '>
                    
                    <div>
                        {`${data.year} • ${data.km_road} km • ${
                            Object.keys(transmission_type).find((v, i, l) => {
                            return transmission_type[v] == data.transmission_type
                        })}`}
                    </div>
                </div>
                <div className=' h-full flex items-end  text-2xl font-semibold '>
                    {`R$ ${data.price}`}
                </div>
            </div>
        </div>
    )
}

CarCard.propTypes = {}

export default CarCard