import React, { useState } from 'react'
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

const CarInfo = ({ onSubmit, onClose, formData, ...props }) => {

    return (
        <div className="w-full text-gray-800 p-8 rounded-md shadow-md">

            <div className='flex gap-4'>

                <div className='mb-4 '>

                    <label className=" w-full picture shadow-md shadow-black  cursor-pointer bg-zinc-100 rounded-lg border-2 border-gray-200 flex items-center justify-center " htmlFor="image_car">

                        <img className="upload_img rounded-lg w-full h-full" id="image_file"
                            src={formData.photo && formData.photo instanceof File ? URL.createObjectURL(formData.photo) : `${MAIN_EXTERNAL_URL}${formData.photo}`}
                        />
                    </label>
                </div>

            </div>
                <div className='flex gap-2  w-full'>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-400 text-sm font-bold mb-2" >Nome</label>
                        <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{formData.name}</span>
                    </div>
                    <div className="mb-4 w-2/3">
                        <label className="block text-gray-400 text-sm font-bold mb-2" >Marca</label>
                        <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{formData.brand}</span>
                    </div>
                    <div className="mb-4 w-2/3">
                        <label className="block text-gray-400 text-sm font-bold mb-2">Modelo</label>
                        <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{formData.model}</span>
                    </div>
                </div>
            <div className='flex gap-2'>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >Transmissão</label>

                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        Object.keys(transmission_type).find((v, i, l) => {
                            return transmission_type[v] == formData.transmission_type
                        })
                    }</span>
                </div>
                <div className="mb-4 w-full">

                    <label className="block text-gray-400 text-sm font-bold mb-2" >Combustível</label>

                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        Object.keys(fuel_type).find((v, i, l) => {
                            return fuel_type[v] == formData.fuel_type
                        })
                    }</span>
                </div>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >Motor</label>

                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        Object.keys(motor_type).find((v, i, l) => {
                            return motor_type[v] == formData.motor_type
                        })
                    }</span>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" >Descrição</label>
                <p>
                    {formData.description}
                </p>

            </div>

            <div className='flex gap-2 '>
                <div className="mb-4 w-1/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >Ano</label>
                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        formData.year
                    }</span>
                </div>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >Cor</label>

                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        Object.keys(color).find((v, i, l) => {
                            return color[v] == formData.color
                        })
                    }</span>
                </div>
                <div className="mb-4 w-1/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >Km rodados</label>
                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        formData.km_road
                    }</span>
                </div>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >Preço (R$)</label>
                    <span className="w-full text-gray-300 px-3 py-2  rounded-md"  >{
                        formData.price
                    }</span>
                </div>
            </div>
            
        </div>
    )
}

CarInfo.propTypes = {}

export default CarInfo