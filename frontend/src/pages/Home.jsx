import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';


function Home() {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    // 5:2


    const submitHandler = (e) => {
        e.preventDefault()
    }


    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity: 1,
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])


    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />

            <div className='h-screen w-screen' n>
                {/* image for temporary use */}
                <img className='h-full w-full object-cover ' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="map" />

            </div>


            <div className=' flex flex-col justify-end h-screen  absolute top-0 w-full '>
                <div className='h[30%] p-6  bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false);
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold '>Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>

                        <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full  "></div>

                        <input
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            value={pickup}
                            onChange={(e) => {
                                setPickup(e.target.value)
                            }}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 ' type="text" placeholder='Add a pick-up location' />

                        <input
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            value={destination}
                            onChange={(e) => {
                                setDestination(e.target.value)
                            }}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destiation' />
                    </form>
                </div>

                <div ref={panelRef} className='bg-white h-0'>

                    <LocationSearchPanel />

                </div>
            </div>

            <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 ' >
                <h3 className='text-2xl font-semibold mb-5 '>Choose a Vehicle</h3>
                <div className='flex border-2 active:border-black bg-gray-100 rounded-xl mb-2 w-full p-3 items-center justify-between '>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car" />
                    <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-base '>UberGo <span><i className="ri-user-3-fill"></i>4</span> </h4>
                        <h5 className='font-medium text-sm'>2 mins away </h5>
                        <p className='font-normal text-xs text-gray-600  '>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹193.19</h2>
                </div>

                <div className='flex border-2 active:border-black rounded-xl mb-2 w-full p-3 items-center justify-between '>
                    <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s" alt="car" />
                    <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-base '>UberAuto <span><i className="ri-user-3-fill"></i>4</span> </h4>
                        <h5 className='font-medium text-sm'>3 mins away </h5>
                        <p className='font-normal text-xs text-gray-600  '>Affordable, auto rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹103.30</h2>
                </div>

                <div className='flex border-2 active:border-black rounded-xl mb-2 w-full p-3 items-center justify-between '>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car" />
                    <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-base '>Moto <span><i className="ri-user-3-fill"></i>4</span> </h4>
                        <h5 className='font-medium text-sm'>4 mins away </h5>
                        <p className='font-normal text-xs text-gray-600  '>Affordable, motor cycle rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹190.35</h2>
                </div>

            </div>
        </div>
    )
}

export default Home