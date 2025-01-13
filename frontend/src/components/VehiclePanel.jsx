import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false)
            }} className='p-1 text-center w-[93%] absolute top-0 '><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5 '>Choose a Vehicle</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true);
            }} className='flex border-2 active:border-black bg-gray-100 rounded-xl mb-2 w-full p-3 items-center justify-between '>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base '>UberGo <span><i className="ri-user-3-fill"></i>4</span> </h4>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600  '>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹193.19</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true);
            }}
                className='flex border-2 active:border-black rounded-xl mb-2 w-full p-3 items-center justify-between '>
                <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s" alt="car" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base '>UberAuto <span><i className="ri-user-3-fill"></i>4</span> </h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600  '>Affordable, auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹103.30</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true);
            }} className='flex border-2 active:border-black rounded-xl mb-2 w-full p-3 items-center justify-between '>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base '>Moto <span><i className="ri-user-3-fill"></i>4</span> </h4>
                    <h5 className='font-medium text-sm'>4 mins away </h5>
                    <p className='font-normal text-xs text-gray-600  '>Affordable, motor cycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹190.35</h2>
            </div>
        </div>
    )
}

export default VehiclePanel