import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


function Home() {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const panelRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehicleFoundRef = useRef(null);

    const [vehiclepanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);

    const [waitingForDriver, setSetWaitingForDriver] = useState(false);

    const [suggestions, setSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)

    const handleLocationInput = async (e, field) => {
        const value = e.target.value
        if (field === 'pickup') {
            setPickup(value)
        } else {
            setDestination(value)
        }

        // Return early if input is less than 3 characters
        if (value.trim().length < 3) {
            setSuggestions([])
            return
        }

        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: value.trim() }, // Changed from query to input
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setSuggestions(response.data)
        } catch (error) {
            console.error('Error fetching suggestions:', error)
            setSuggestions([])
        } finally {
            setLoading(false)
        }
    }

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


    useGSAP(function () {
        if (vehiclepanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0%)'

            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'

            })
        }
    }, [vehiclepanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0%)'

            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'

            })
        }
    }, [confirmRidePanel])


    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0%)'

            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'

            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0%)'

            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'

            })
        }
    }, [waitingForDriver])


    async function findTrip() {
        setVehiclePanel(true);
        setPanelOpen(false);

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)


    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        console.log(response);
    }



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
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={(e) => handleLocationInput(e, 'pickup')}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 ' type="text" placeholder='Add a pick-up location' />

                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={(e) => handleLocationInput(e, 'destination')}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destiation' />
                    </form>



                    <button
                        onClick={findTrip}

                        className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
                        Find trip
                    </button>


                </div>

                <div ref={panelRef} className='bg-white h-0'>

                    <LocationSearchPanel
                        suggestions={suggestions}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        loading={loading}
                    />

                </div>
            </div>

            <div ref={vehiclePanelRef}
                className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12' >
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>

            <div ref={confirmRidePanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={vehicleFoundRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12' >
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12' >
                <WaitingForDriver waitingForDriver={waitingForDriver} />
            </div>
        </div >
    )
}

export default Home