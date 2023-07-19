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

const CarForm = ({ onSubmit, onClose, ...props }) => {
    const [formData, setFormData] = useState(
        {
            name: '',
            description: '',
            model: '',
            brand: '',
            price: 0.0,
            color: color[Object.keys(color)[0]],
            year: new Date().getFullYear(),
            km_road: 0.0,
            motor_type: motor_type[Object.keys(motor_type)[0]],
            fuel_type: fuel_type[Object.keys(fuel_type)[0]],
            transmission_type: transmission_type[Object.keys(transmission_type)[0]],
            photo: undefined,
            ...(props.formData ?? {})
        }
    )

    const handleAddImage = (event) => {
        if (event.target.files && event.target.files[0]) { // Has image
            setFormData({ ...formData, photo: (event.target.files[0]) });
        }
    }

    const handleChangeData = (event) => {

        let data = { ...formData };
        data[event.target.name] = event.target.value;
        setFormData(data);
    }

    const yearOptions = () => {
        const year = new Date().getFullYear() + 5;
        var list = [];

        for (let index = 1980; index < year; index++) {
            list.push(index)
        }

        return list;
    }




    const onValidate = (e) => {
        e.preventDefault();
        var form = new FormData();

        for (var key in formData) {
            form.append(key, formData[key]);
        }

        onSubmit(form);
    }

    return (
        <form onSubmit={onValidate} className="w-full text-gray-800 p-8 rounded-md shadow-md" method='POST' action='#'>

            <div className='flex gap-4'>

                <div className='mb-4 '>
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="image_car">Foto</label>

                    <label className=" h-56 w-56 picture shadow-md shadow-black  cursor-pointer bg-zinc-100 rounded-lg border-2 border-gray-200 flex items-center justify-center " htmlFor="image_car">

                        <img className="upload_img rounded-lg w-full h-full" id="image_file"
                            src={formData.photo && formData.photo instanceof File ? URL.createObjectURL(formData.photo) : `${MAIN_EXTERNAL_URL}${formData.photo}`}
                        />
                        <input name="photo" type="file" className='hidden'
                            id='image_car'
                            onChange={handleAddImage} placeholder="Selecione uma imagem"
                            accept="image/*" required={formData.photo === 'undefined'} />
                    </label>
                </div>

                <div className='flex-row  w-full'>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">Nome</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="name" name="name" placeholder="ex: Fiat Toro VOLCANO 4WD"
                            value={formData.name} onChange={handleChangeData} required
                        />
                    </div>
                    <div className="mb-4 w-2/3">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="brand">Marca</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="brand" name="brand" placeholder="Chevrolet, Honda, etc..."
                            value={formData.brand} onChange={handleChangeData} required
                        />
                    </div>
                    <div className="mb-4 w-2/3">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="model">Modelo</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="model" name="model" placeholder="Onix, Strada, S10, etc..."
                            value={formData.model} onChange={handleChangeData} required
                        />
                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="transmission">Transmissão</label>

                    <select id='transmission' name='transmission_type' className='w-full h-fit px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'

                        defaultValue={String(formData.transmission_type)}
                        onChange={handleChangeData} required
                    >

                        {
                            Object.keys(transmission_type).map((k, i) => {
                                return <option key={`${k}${i}`} value={transmission_type[k]} >{k}</option>
                            })
                        }

                    </select>
                </div>
                <div className="mb-4 w-full">

                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="fuel">Combustível</label>

                    <select defaultValue={String(formData.fuel_type)} id='fuel' name='fuel_type' className='w-full h-fit px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                        onChange={handleChangeData} required
                    >
                        {
                            Object.keys(fuel_type).map((k, i) => {
                                return <option key={`${k}${i}`} value={fuel_type[k]} >{k}</option>
                            })
                        }
                    </select>
                </div>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="motor">Motor</label>

                    <select defaultValue={String(formData.motor_type)} id='motor' name='motor_type' className='w-full h-fit px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                        onChange={handleChangeData} required
                    >
                        {
                            Object.keys(motor_type).map((k, i) => {
                                return <option key={`${k}${i}`} value={motor_type[k]} >{k}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            {/* <div className='flex gap-2 '>
                                <div className="mb-4 w-2/3">
                                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">Marca</label>
                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                        type="text" id="name" name="name" placeholder="Chevrolet, Honda, etc..." />
                                </div>
                                <div className="mb-4 w-2/3">
                                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="model">Modelo</label>
                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                        type="text" id="model" name="model" placeholder="Onix, Strada, S10, etc..." />
                                </div>
                                <div className="mb-4 w-full">
                                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">Nome</label>
                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                        type="text" id="name" name="name" placeholder="ex: Fiat Toro VOLCANO 4WD" />
                                </div>
                            </div> */}
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="description">Descrição</label>

                <textarea name="description" id="description" cols="30" rows="5" placeholder='Descrição do veículo, etc.' className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"

                    value={formData.description} defaultValue={formData.description} onChange={handleChangeData}
                ></textarea>
            </div>

            <div className='flex gap-2 '>
                <div className="mb-4 w-1/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="year">Ano</label>
                    <select defaultValue={formData.year} id='year' name='year' className='w-full h-fit px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                        required
                    >
                        {

                            yearOptions().reverse().map((y, i) => {
                                return (
                                    <option key={`opYear${i}`}>{y}</option>
                                )
                            })

                        }
                    </select>
                </div>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="color">Cor</label>

                    <select defaultValue={formData.color} id='color' name='color' className='w-full h-fit px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                        onChange={handleChangeData} required
                    >
                        {
                            Object.keys(color).map((k, i) => {
                                return <option key={`${k}${i}`} value={color[k]} >{k}</option>
                            })
                        }
                    </select>
                    {/* <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                    type="text" id="model" name="model" placeholder="Onix, Strada, S10, etc..." /> */}
                </div>
                <div className="mb-4 w-1/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="kilometers">Km rodados</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="number" pattern='^\d*(\.\d{0,2})?$' step={.1} min={0} id="kilometers" name="km_road" placeholder="33000.1"
                        value={formData.km_road} onChange={handleChangeData}
                    />
                </div>
                <div className="mb-4 w-2/3">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="price">Preço (R$)</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="number" pattern='^\d*(\.\d{0,2})?$' step={.01} min={0} id="price" name="price" placeholder="22999.00"
                        value={formData.price} onChange={handleChangeData}
                    />
                </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <button
                    className="  bg-gray-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                    type="submit">Salvar</button>
                <button
                    onClick={onClose}
                    className=" bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                    type="button">Fechar formulário</button>
            </div>
        </form>
    )
}

CarForm.propTypes = {}

export default CarForm