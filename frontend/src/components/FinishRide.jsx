import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
    return (
        <div >

            <h5
                onClick={() => {
                    props.setFinishRidePanel(false);
                }} className='p-1 text-center w-[93%] absolute top-0 '><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

            <div className='flex items-center border  justify-between p-4  border-yellow-600 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-14 w-14 rounded-full object-cover ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjxBNPGMGSmZFPjN0KBemfAP0M87bFE5h_A&s" alt="" />
                    <h2 className='text-lg font-medium'>Jay Oza</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 '>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium '>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahemdabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 '>
                        <i className="text-lg ri-map-pin-2-fill"></i>

                        <div>
                            <h3 className='text-lg font-medium '>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahemdabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3  '>
                        <i className="text-lg ri-money-rupee-circle-fill"></i>

                        <div>
                            <h3 className='text-lg font-medium '>₹119.30</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>


                <div className='mt-6 w-full'>

                    <Link to='/captain-home' className='w-full mt-5 flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride
                    </Link>

                    <p className=' mt-10 text-xs '>click on finish ride button if you have completed the payment. </p>


                </div>
            </div>
        </div>
    )
}

export default FinishRide