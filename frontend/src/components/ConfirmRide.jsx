import React from 'react'

const ConfirmRide = ({
    setConfirmRidePanel,
    setVehicleFound,
    createRide,
    pickup,
    destination,
    fare,
    vehicleType
}) => {
    return (
        <div>
            <h5 onClick={() => setConfirmRidePanel(false)}
                className='p-1 text-center w-[93%] absolute top-0'>
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20'
                    src={vehicleType === 'moto'
                        ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                        : vehicleType === 'auto'
                            ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                            : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
                    }
                    alt="vehicle"
                />

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm text-gray-600'>{pickup || 'No pickup location selected'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{destination || 'No destination selected'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>
                                ₹{fare[vehicleType] || '0'}
                            </h3>
                            <p className='text-sm text-gray-600'>Cash payment</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setVehicleFound(true);
                        setConfirmRidePanel(false);
                        createRide();
                    }}
                    className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide

// 8:50